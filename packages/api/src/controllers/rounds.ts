import { apiResponse } from '@/lib/api-response/index.js';
import { duplicateRound } from '@/lib/prisma/duplicate-round.js';
import { getLastCompleteRound } from '@/lib/prisma/helpers.js';
import { prisma } from '@/lib/prisma/instance.js';
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
    await prisma.$transaction(async (prisma) => {
      const lastRound = await getLastCompleteRound();

      // First round creation
      if (!lastRound) {
        const createdRound = await prisma.round.create({ data: {} });
        return apiResponse.success(res, { message: 'Round created successfully', round: createdRound }, StatusCodes.CREATED);
      }

      await duplicateRound(lastRound);

      apiResponse.success(res, { message: 'Round created successfully' }, StatusCodes.CREATED);
    });
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { ...data } = req.body; // TODO: validate input

    const edited = await prisma.round.update({
      where: {
        id: Number(id),
      },
      data,
    });

    apiResponse.success(res, { message: 'Round edited successfully', data: edited }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params; // TODO: validate input

    const deleted = await prisma.round.delete({
      where: {
        id: Number(id),
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
