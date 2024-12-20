import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response, Router } from 'express';

export const stepsRouter = Router();

stepsRouter.get('/:roundId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roundId } = req.params;
    const steps = await prisma.step.findMany({
      where: {
        roundId,
      },
      orderBy: {
        position: 'asc',
      },
    });

    apiResponse.success(res, { steps });
  } catch (error) {
    next(error);
  }
});
