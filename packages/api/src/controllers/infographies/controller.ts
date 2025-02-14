import {
  BulkUpdateInfographyBody,
  bulkUpdateInfogrpahyBodySchema,
  createInfogrpahyBodySchema,
  updateInfogrpahyBodySchema,
} from '@/controllers/infographies/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { PrismaClient } from '@prisma/client/extension';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getLastInfographyPosition(stepId: number, _prisma: PrismaClient) {
  const lastInfography = await prisma.infography.findFirst({
    where: { stepId },
    orderBy: { position: 'desc' },
  });

  return lastInfography ? lastInfography.position : 0;
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createInfogrpahyBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const lastPosition = await getLastInfographyPosition(parsed.data.stepId, prisma);
    const position = lastPosition > 0 ? lastPosition + 1 : 0;

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

function getBulkUpdatesQueries(data: BulkUpdateInfographyBody, _prisma: PrismaClient) {
  return data.map(async ({ id, ...data }) => {
    return _prisma.infography.update({ where: { id }, data });
  });
}

async function getBulkNewInfographiesQueries(data: BulkUpdateInfographyBody, _prisma: PrismaClient) {
  const newInfographies = data.filter(({ id }) => id < 0);

  if (!data) {
    return [];
  }

  const lastPosition = await getLastInfographyPosition(newInfographies[0].stepId, _prisma);
  const infographiesToInsert = [];
  let currentPosition = lastPosition > 0 ? lastPosition + 1 : 0;

  for (const newInfography of newInfographies) {
    infographiesToInsert.push(
      _prisma.infography.create({
        data: {
          image: newInfography.image,
          markdown: newInfography.markdown,
          stepId: newInfography.stepId,
          position: currentPosition,
        },
      }),
    );

    currentPosition++;
  }

  return infographiesToInsert;
}

export async function updateBulk(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedBody = bulkUpdateInfogrpahyBodySchema.safeParse(req.body);

    if (!parsedBody.success) {
      throw ApiError.badRequest();
    }

    const infographiesToUpdate = parsedBody.data.filter(({ id }) => id >= 0);
    const infographiesToInsert = parsedBody.data.filter(({ id }) => id < 0);

    //validate all has the same stepId
    if (infographiesToInsert.some(({ stepId }) => stepId !== infographiesToInsert[0].stepId)) {
      throw ApiError.badRequest();
    }

    const bulk = await prisma.$transaction(async (prisma) => {
      const results = await Promise.all([
        getBulkUpdatesQueries(infographiesToUpdate, prisma),
        getBulkNewInfographiesQueries(infographiesToInsert, prisma),
      ]).then(([toUpdate, toCreate]) => Promise.all([...toUpdate, ...toCreate]));
      return results;
    });

    apiResponse.success(res, { bulk });
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
