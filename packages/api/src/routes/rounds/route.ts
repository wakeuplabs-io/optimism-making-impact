import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/prisma.js';
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

roundsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lastRound = await prisma.round.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    const nextRoundNumber = lastRound ? lastRound.id + 1 : 1;

    await prisma.round.create({
      data: {
        name: `Round ${nextRoundNumber}`,
        icon: 'DELETE_THIS',
      },
    });

    apiResponse.success(res, { message: 'Round created successfully' }, 201);
  } catch (error) {
    next(error);
  }
});
