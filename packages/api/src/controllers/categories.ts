import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const getAllQuerySchema = z.object({
  roundId: z.string().transform(Number).optional(),
});

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = getAllQuerySchema.safeParse(req.query);

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
    const { title, iconURL, roundId } = req.body; // TODO: validate input

    await prisma.category.create({
      data: {
        name: title,
        icon: iconURL,
        roundId: Number(roundId),
      },
    });

    apiResponse.success(res, { message: 'Category created successfully.' }, 201);
  } catch (error) {
    next(error);
  }
}

async function editOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, name } = req.body; // TODO: validate input

    const edited = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });

    apiResponse.success(res, { message: 'Category edited.', data: edited }, 201);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; // TODO: validate input

    const deleted = await prisma.category.delete({
      where: { id: Number(id) },
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
