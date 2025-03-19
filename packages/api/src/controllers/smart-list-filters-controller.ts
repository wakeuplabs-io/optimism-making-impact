import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma-instance.js';
import { idParamsSchema } from '@/lib/schemas.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getByCategoryId(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = idParamsSchema.safeParse(req.params);

    if (!parsed.success) throw ApiError.badRequest();

    const category = await prisma.category.findFirst({
      where: { id: parsed.data.id },
      include: {
        steps: {
          select: {
            smartListFilterId: true,
          },
        },
      },
    });

    if (!category) throw ApiError.notFound('Category not found.');

    const smartListFiltersIds = category.steps.map((step) => step.smartListFilterId);
    const stepsIds: number[] = smartListFiltersIds.filter((id): id is number => id !== null);

    const smartListFilters = await prisma.smartListFilter.findMany({
      where: { id: { in: stepsIds } },
    });

    apiResponse.success(res, { smartListFilters }, StatusCodes.OK);
  } catch (error) {
    next(error);
  }
}

export const smartListFiltersController = {
  getByCategoryId,
};
