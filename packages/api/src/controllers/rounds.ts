import { createBasicRound, duplicateCategoryAttributes, duplicateStepContent, fetchLastRound } from '@/controllers/helpers.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const rounds = await prisma.round.findMany({
      orderBy: { id: 'desc' },
      take: 10,
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
      // Step 1: Fetch the last round
      const lastRound = await fetchLastRound();

      // CASE: First round creation
      if (!lastRound) {
        const createdRound = await prisma.round.create({ data: {} });
        return apiResponse.success(res, { message: 'Round created successfully', round: createdRound }, 201);
      }

      // Step 2: Create a new round with basic categories and steps
      const newRound = await createBasicRound(lastRound);

      // Step 3: Duplicate categories and their attributes
      await duplicateCategoryAttributes(lastRound.categories, newRound);

      // Step 4: Duplicate steps and their associated content
      await duplicateStepContent(lastRound.steps, newRound);

      apiResponse.success(res, { message: 'Round created successfully', data: newRound }, 201);
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
