import { createAttributeSchema } from '@/controllers/attributes/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { NextFunction, Request, Response } from 'express';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createAttributeSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    apiResponse.success(res, parsed.data, 201);
  } catch (error) {
    next(error);
  }
}

export const attributesController = {
  create,
};
