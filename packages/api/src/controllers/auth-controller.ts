import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { authManager } from '@/lib/auth/index.js';
import { authValidateSchema } from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';

async function validate(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = authValidateSchema.safeParse(req.body);

    if (!parsed.success) {
      throw ApiError.badRequest();
    }

    const payload = await authManager.authenticate(parsed.data.token);

    return apiResponse.success(res, {
      ...payload,
    });
  } catch (error) {
    next(error);
  }
}

export const authController = {
  validate,
};
