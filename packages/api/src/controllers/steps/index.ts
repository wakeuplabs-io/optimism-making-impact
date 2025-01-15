import { createBodySchema, idParamsSchema, roundIdParamsSchema, updateBodySchema } from '@/controllers/steps/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getByRoundId(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = roundIdParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const steps = await prisma.step.findMany({
      where: { roundId: parsed.data.roundId },
      orderBy: { position: 'asc' },
    });

    apiResponse.success(res, { steps });
  } catch (error) {
    next(error);
  }
}
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const lastStep = await prisma.step.findFirst({
      where: { roundId: parsed.data.roundId },
      orderBy: { position: 'desc' },
    });

    const position = lastStep ? lastStep.position + 1 : 1;

    const created = await prisma.step.create({
      data: { ...parsed.data, position },
    });

    apiResponse.success(res, created, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedId = idParamsSchema.safeParse(req.params);
    const parsedBody = updateBodySchema.safeParse(req.body);

    if (!parsedBody.success || !parsedId.success) throw ApiError.badRequest();

    const updated = await prisma.step.update({
      where: { id: parsedId.data.id },
      data: parsedBody.data,
    });

    apiResponse.success(res, updated);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const deleted = await prisma.$transaction(async (prisma) => {
      // Delete the specified step
      const deleted = await prisma.step.delete({
        where: { id: parsed.data.id },
      });

      // Get all remaining steps ordered by position
      const remainingSteps = await prisma.step.findMany({
        orderBy: { position: 'asc' },
      });

      if (remainingSteps.length === 0) {
        throw new ApiError(400, 'Cannot delete the last remaining step.');
      }

      // Update their positions sequentially (zero-based)
      await Promise.all(
        remainingSteps.map((step, index) =>
          prisma.step.update({
            where: { id: step.id },
            data: { position: index },
          }),
        ),
      );

      return deleted;
    });

    apiResponse.success(res, deleted);
  } catch (error) {
    next(error);
  }
}

export const stepsController = {
  getByRoundId,
  create,
  update,
  deleteOne,
};
