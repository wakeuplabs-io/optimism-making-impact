import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas.js';
import { createAttributeSchema, updateAttributeSchema } from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createAttributeSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const attribute = await prisma.attribute.create({
      data: {
        ...parsed.data,
        categoryId: 1, // HARDCODED:
      },
    });

    apiResponse.success(res, attribute, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateAttributeSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const attribute = await prisma.attribute.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    });

    apiResponse.success(res, attribute, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const deleted = await prisma.attribute.delete({
      where: { id: parsed.data.id },
    });

    apiResponse.success(res, deleted, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

export const attributesController = {
  create,
  update,
  deleteOne,
};
