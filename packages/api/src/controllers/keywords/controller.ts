import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getByStepId(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const keywords = await prisma.keyword.findMany({
      where: { stepId: parsed.data.id },
    });

    apiResponse.success(res, { keywords }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const card = await prisma.card.findFirst({
      where: {
        keywords: { some: { id: parsed.data.id } },
      },
    });

    if (card) throw new ApiError(400, 'Keyword is in use.');

    const deleted = await prisma.keyword.delete({
      where: { id: parsed.data.id },
    });

    apiResponse.success(res, deleted, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
}

export const keywordsController = {
  getByStepId,
  deleteOne,
};
