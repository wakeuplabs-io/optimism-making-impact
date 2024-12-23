import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
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
