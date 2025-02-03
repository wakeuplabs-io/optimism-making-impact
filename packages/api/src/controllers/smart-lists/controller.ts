import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getByRoundId(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const categories = await prisma.category.findMany({
      where: { roundId: parsed.data.id },
      include: {
        steps: {
          select: {
            smartListId: true,
          },
        },
      },
    });

    const smartlistIds = categories.flatMap((cat) => cat.steps.map((step) => step.smartListId));
    const stepsIds: number[] = smartlistIds.filter((id): id is number => id !== null);

    const smartLists = await prisma.smartList.findMany({
      where: { id: { in: stepsIds } },
    });

    apiResponse.success(res, { smartLists }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
}

export const smartListsController = {
  getByRoundId,
};
