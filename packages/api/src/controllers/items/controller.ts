import { createItemSchema, updateItemSchema } from '@/controllers/items/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { NextFunction, Request, Response } from 'express';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createItemSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const attribute = await prisma.item.create({
      data: {
        ...parsed.data,
        position: 0,
      },
    });

    apiResponse.success(res, attribute, 201);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);
    const parsedBody = updateItemSchema.safeParse(req.body);

    if (!parsedBody.success || !parsedParams.success) throw ApiError.badRequest();

    const attribute = await prisma.item.update({
      where: { id: parsedParams.data.id },
      data: parsedBody.data,
    });

    apiResponse.success(res, attribute, 201);
  } catch (error) {
    next(error);
  }
}

export const itemsController = {
  create,
  update,
};
