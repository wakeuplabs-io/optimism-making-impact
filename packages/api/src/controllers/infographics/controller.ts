import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { createInfographicBodySchema, updateInfographicBodySchema } from '@optimism-making-impact/schemas';
import { PrismaClient } from '@prisma/client/extension';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getLastInfographicPosition(stepId: number, _prisma: PrismaClient) {
  const lastInfographic = await prisma.infographic.findFirst({
    where: { stepId },
    orderBy: { position: 'desc' },
  });

  return lastInfographic ? lastInfographic.position : 0;
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createInfographicBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const lastPosition = await getLastInfographicPosition(parsed.data.stepId, prisma);
    const position = lastPosition > 0 ? lastPosition + 1 : 0;

    const created = await prisma.infographic.create({
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
    const parsedBody = updateInfographicBodySchema.safeParse(req.body);

    if (!parsedBody.success || !parsedId.success) throw ApiError.badRequest();

    const updated = await prisma.infographic.update({
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

    const deleted = await prisma.infographic.delete({
      where: { id: parsed.data.id },
    });

    apiResponse.success(res, deleted);
  } catch (error) {
    next(error);
  }
}

export const infographicsController = {
  create,
  update,
  deleteOne,
};
