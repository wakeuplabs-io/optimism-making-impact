import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

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

    apiResponse.success(res, { message: 'Round created successfully' }, 201); // TODO: NO VA
    res.status(StatusCodes.CREATED).json({ message: 'Round created successfully' });
  } catch (error) {
    next(error);
  }
});
