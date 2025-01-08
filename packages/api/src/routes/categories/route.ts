import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/prisma.js';
import { NextFunction, Request, Response, Router } from 'express';

export const categoriesRouter = Router();

categoriesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    apiResponse.success(res, { categories });
  } catch (error) {
    next(error);
  }
});

categoriesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, iconURL, roundId } = req.body;

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
});
