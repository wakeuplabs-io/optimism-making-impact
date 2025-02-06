import { Request, Response, NextFunction } from 'express';
import { authValidateSchema } from './schemas.js';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';

if (!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_USER_POOL_CLIENT) {
  throw new Error('Missing Cognito configs');
}

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID, // e.g., 'us-east-1_abcdefghi'
  clientId: process.env.COGNITO_USER_POOL_CLIENT, // e.g., '1234567890abcdefghij'
  tokenUse: 'id', // or 'id' depending on which token you're validating
});

async function validate(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = authValidateSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();
    // Continue with login logic using validatedData
    const data = await jwtVerifier.verify(parsed.data.token);

    return apiResponse.success(res, {
      jwtToken: parsed.data.token,
      username: data['name'],
      email: data['email'],
      isAdmin: false,
    });
  } catch (error) {
    next(error);
  }
}

export const authController = {
  validate,
};
