import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const rounds = await prisma.round.findMany({
      orderBy: { createdAt: 'desc' },
    });

    apiResponse.success(res, { rounds });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const lastRound = await prisma.round.findFirst({
      orderBy: {
        createdAt: 'desc',
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

    apiResponse.success(res, { message: 'Round edited successfully', data: edited }, 201);
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

    apiResponse.success(res, { message: 'Round deleted.', data: deleted }, 201);
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
