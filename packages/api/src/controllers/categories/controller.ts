import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { createCategoryBodySchema, editCategoryBodySchema, getAllCategoriesSchema, idParamsSchema } from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

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

    apiResponse.success(res, { message: 'Category created successfully.' }, StatusCodes.CREATED);
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

    apiResponse.success(res, edited, StatusCodes.CREATED);
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

    apiResponse.success(res, { message: 'Category deleted.', data: deleted }, StatusCodes.CREATED);
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
