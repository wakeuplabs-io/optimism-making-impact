import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma-instance.js';
import { idParamsSchema } from '@/lib/schemas.js';
import { createItemSchema, updateItemSchema } from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createItemSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const attribute = await prisma.item.create({
      data: {
        ...parsed.data,
      },
    });

    apiResponse.success(res, attribute, StatusCodes.CREATED);
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

    apiResponse.success(res, attribute, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);

    if (!parsedParams.success) throw ApiError.badRequest();

    const deleted = await prisma.item.delete({
      where: { id: parsedParams.data.id },
    });

    apiResponse.success(res, deleted, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

export const itemsController = {
  create,
  update,
  deleteOne,
};
