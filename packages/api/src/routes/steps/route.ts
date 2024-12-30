import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';

export const stepsRouter = Router();

const paramSchema = z.object({
  roundId: z.string().transform(Number),
});

stepsRouter.get('/:roundId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roundId } = req.params;

    const parsed = paramSchema.safeParse({ roundId });

    if (!parsed.success) throw ApiError.badRequest();

    const steps = await prisma.step.findMany({
      where: {
        roundId: parsed.data.roundId,
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
