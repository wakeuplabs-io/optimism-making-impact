import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
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
  deleteOne,
};
