import { Request, Response, NextFunction } from 'express';
import { authValidateSchema } from './schemas.js';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';

if (!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_USER_POOL_CLIENT) {
  throw new Error('Missing Cognito configs');
}

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID, // e.g., 'us-east-1_abcdefghi'
  clientId: process.env.COGNITO_USER_POOL_CLIENT, // e.g., '1234567890abcdefghij'
  tokenUse: 'id', // or 'id' depending on which token you're validating
});

type IdTokenPayload = CognitoIdTokenPayload & { name: string; email: string };

type TokenVerification = { status: 'success'; data: IdTokenPayload } | { status: 'fail' };

async function verifyToken(token: string): Promise<TokenVerification> {
  try {
    const payload = (await jwtVerifier.verify(token)) as IdTokenPayload;
    return { status: 'success', data: payload };
  } catch (error) {
    return { status: 'fail' };
  }
}

async function validate(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = authValidateSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();
    // Continue with login logic using validatedData
    const tokenVerification = await verifyToken(parsed.data.token);

    if (tokenVerification.status === 'fail') throw ApiError.unauthorized();

    return apiResponse.success(res, {
      authToken: parsed.data.token,
      userName: tokenVerification.data.name,
      email: tokenVerification.data.email,
      isAdmin: false,
    });
  } catch (error) {
    next(error);
  }
}

export const authController = {
  validate,
};
