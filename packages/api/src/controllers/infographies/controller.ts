import {
  bulkUpdateInfogrpahyBodySchema,
  createInfogrpahyBodySchema,
  updateInfogrpahyBodySchema,
} from '@/controllers/infographies/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createInfogrpahyBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const lastInfogrpahy = await prisma.infography.findFirst({
      where: { stepId: parsed.data.stepId },
      orderBy: { position: 'desc' },
    });

    const position = lastInfogrpahy ? lastInfogrpahy.position + 1 : 0;

    const created = await prisma.infography.create({
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
    const parsedBody = updateInfogrpahyBodySchema.safeParse(req.body);

    if (!parsedBody.success || !parsedId.success) throw ApiError.badRequest();

    const updated = await prisma.infography.update({
      where: { id: parsedId.data.id },
      data: parsedBody.data,
    });

    apiResponse.success(res, updated);
  } catch (error) {
    next(error);
  }
}

export async function updateBulk(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedBody = bulkUpdateInfogrpahyBodySchema.safeParse(req.body);

    if (!parsedBody.success) {
      throw ApiError.badRequest();
    }

    const updates = parsedBody.data;

    const updated = await prisma.$transaction(async (prisma) => {
      const results = await Promise.all(
        updates.map(async ({ id, ...data }) => {
          return prisma.infography.update({ where: { id }, data });
        }),
      );
      return results;
    });

    apiResponse.success(res, { updated });
  } catch (error) {
    next(error);
  }
}
async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const deleted = await prisma.infography.delete({
      where: { id: parsed.data.id },
    });

    apiResponse.success(res, deleted);
  } catch (error) {
    next(error);
  }
}

export const infographiesController = {
  create,
  update,
  updateBulk,
  deleteOne,
};
