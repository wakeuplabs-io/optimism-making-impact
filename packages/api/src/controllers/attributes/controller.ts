import { createAttributeSchema, updateAttributeSchema } from '@optimism-making-impact/schemas';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { NextFunction, Request, Response } from 'express';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createAttributeSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const attribute = await prisma.attribute.create({
      data: {
        ...parsed.data,
        categoryId: 1, // HARDCODED: // TODO: FIX THIS!!!!!!!!
      },
    });

    apiResponse.success(res, attribute, 201); // TODO: DO NOT use this api response, no needed, also DO NOT use magic numbers!!!!!!!
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

    apiResponse.success(res, attribute, 201);
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

    apiResponse.success(res, deleted, 201);
  } catch (error) {
    next(error);
  }
}

export const attributesController = {
  create,
  update,
  deleteOne,
};
