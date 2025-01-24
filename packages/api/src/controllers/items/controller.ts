import { createItemSchema, updateItemSchema } from '@/controllers/items/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
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
    const parsed = updateItemSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const attribute = await prisma.attribute.update({
      where: { id: parsed.data.id },
      data: parsed.data,
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
