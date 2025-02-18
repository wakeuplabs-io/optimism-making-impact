import { editCategoryBodySchema, getAllCategoriesSchema } from '@/controllers/categories/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { NextFunction, Request, Response } from 'express';
import { createCategoryBodySchema } from '@optimism-making-impact/schemas';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = getAllCategoriesSchema.safeParse(req.query);

    if (!parsed.success) throw ApiError.badRequest();

    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
      where: { roundId: parsed.data.roundId },
    });

    apiResponse.success(res, { categories });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createCategoryBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    await prisma.category.create({
      data: parsed.data,
    });

    apiResponse.success(res, { message: 'Category created successfully.' }, 201);
  } catch (error) {
    next(error);
  }
}

async function editOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);
    const parsedBody = editCategoryBodySchema.safeParse(req.body);

    if (!parsedBody.success || !parsedParams.success) throw ApiError.badRequest();

    const edited = await prisma.category.update({
      where: { id: parsedParams.data.id },
      data: parsedBody.data,
    });

    apiResponse.success(res, edited, 201);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);

    if (!parsedParams.success) throw ApiError.badRequest();

    const deleted = await prisma.category.delete({
      where: { id: parsedParams.data.id },
    });

    apiResponse.success(res, { message: 'Category deleted.', data: deleted }, 201);
  } catch (error) {
    next(error);
  }
}

export const categoriesController = {
  getAll,
  create,
  editOne,
  deleteOne,
};
