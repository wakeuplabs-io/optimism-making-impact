import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma-instance.js';
import { StepType } from '@optimism-making-impact/prisma';
import {
  createStepBodySchemaWithValidation,
  getAllStepsQueryParams,
  idParamsSchema,
  updateStepBodySchema,
} from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);

    if (!parsedParams.success) throw ApiError.badRequest();

    const step = await prisma.step.findUnique({
      where: { id: parsedParams.data.id },
      include: {
        cards: { orderBy: { createdAt: 'asc' }, include: { attribute: true, keywords: true } },
        infographics: { orderBy: { createdAt: 'asc' } },
        items: {
          include: { attribute: true },
          orderBy: { createdAt: 'asc' },
        },
        smartListFilter: {
          include: {
            attributes: {
              orderBy: { id: 'asc' },
            },
          },
        },
        keywords: { orderBy: { value: 'asc' } },
      },
    });

    if (!step) throw ApiError.notFound();

    apiResponse.success(res, step);
  } catch (error) {
    next(error);
  }
}

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = getAllStepsQueryParams.safeParse(req.query);

    if (!parsed.success) throw ApiError.badRequest();

    const steps = await prisma.step.findMany({
      where: { categoryId: parsed.data.categoryId },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });

    apiResponse.success(res, { steps });
  } catch (error) {
    next(error);
  }
}
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createStepBodySchemaWithValidation.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const result = await prisma.$transaction(async (prisma) => {
      const created = await prisma.step.create({
        data: { ...parsed.data },
      });

      const isItemType = parsed.data.type === StepType.SMARTLIST;

      if (isItemType) {
        await prisma.smartListFilter.create({
          data: {
            title: parsed.data.title,
            steps: {
              connect: { id: created.id },
            },
          },
        });
      }

      return created;
    });

    apiResponse.success(res, result, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedId = idParamsSchema.safeParse(req.params);
    const parsedBody = updateStepBodySchema.safeParse(req.body);

    if (!parsedBody.success || !parsedId.success) throw ApiError.badRequest();

    const result = await prisma.$transaction(async (prisma) => {
      const updated = await prisma.step.update({
        where: { id: parsedId.data.id },
        data: parsedBody.data,
        select: { smartListFilter: true },
      });

      if (updated.smartListFilter) {
        await prisma.smartListFilter.update({
          where: { id: updated.smartListFilter.id },
          data: { title: parsedBody.data.title },
        });
      }

      return updated;
    });

    apiResponse.success(res, result, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    // Delete the specified step
    const deleted = await prisma.step.delete({
      where: { id: parsed.data.id },
    });

    apiResponse.success(res, deleted);
  } catch (error) {
    next(error);
  }
}

export const stepsController = {
  getOne,
  getAll,
  create,
  update,
  deleteOne,
};
