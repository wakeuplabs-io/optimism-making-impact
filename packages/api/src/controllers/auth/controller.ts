import { Request, Response, NextFunction } from 'express';
import { authValidateSchema } from './schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { AuthenticatedUser, authManager } from '@/lib/auth/index.js';

type AuthenticationResult = { status: 'success'; data: AuthenticatedUser } | { status: 'fail' };

async function authenticate(token: string): Promise<AuthenticationResult> {
  try {
    const payload = await authManager.authenticate(token);
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
    const authResult = await authenticate(parsed.data.token); // TODO: DO NOT DO THIS, no need a function to execute 1 line of code!!!!!!

    if (authResult.status === 'fail') throw ApiError.unauthorized();

    return apiResponse.success(res, {
      ...authResult.data,
    });
  } catch (error) {
    next(error);
  }
}

export const authController = {
  validate,
};
