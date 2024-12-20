import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response, Router } from 'express';

export const roundsRouter = Router();

roundsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rounds = await prisma.round.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    apiResponse.success(res, { rounds });
  } catch (error) {
    next(error);
  }
});
