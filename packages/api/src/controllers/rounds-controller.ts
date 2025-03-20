import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma-instance.js';
import { duplicateRound, getLastCompleteRound } from '@/services/rounds.js';
import { idParamsSchema, updateRoundBodySchema } from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const rounds = await prisma.round.findMany({
      orderBy: { id: 'desc' },
      include: {
        categories: {
          orderBy: { id: 'asc' },
        },
      },
    });

    apiResponse.success(res, { rounds });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lastRound = await getLastCompleteRound();

    if (!lastRound) {
      // First round creation
      throw new ApiError(StatusCodes.BAD_REQUEST, "Can't duplicate round if there's no previous round.");
    }

    await duplicateRound(lastRound);

    apiResponse.success(res, { message: 'Round created successfully' }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);
    const parsedBody = updateRoundBodySchema.safeParse(req.body);

    if (!parsedParams.success || !parsedBody.success) throw ApiError.badRequest();

    const edited = await prisma.round.update({
      where: {
        id: Number(parsedParams.data.id),
      },
      data: parsedBody.data,
    });

    apiResponse.success(res, { message: 'Round edited successfully', data: edited }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);

    if (!parsedParams.success) throw ApiError.badRequest();

    const deleted = await prisma.round.delete({
      where: {
        id: Number(parsedParams.data.id),
      },
    });

    apiResponse.success(res, { message: 'Round deleted.', data: deleted }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

export const roundsController = {
  getAll,
  create,
  update,
  deleteOne,
};
