import { createSmartListBodySchema } from '@/controllers/smart-lists/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createSmartListBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const step = await prisma.step.findUnique({
      where: { id: parsed.data.stepId },
      select: { id: true, smartListId: true },
    });

    if (!step) throw ApiError.notFound();

    if (step.smartListId) {
      throw new ApiError(400, 'Step already has a Smart List associated.');
    }

    const created = await prisma.smartList.create({
      data: {
        title: parsed.data.title,
        steps: {
          connect: { id: step.id },
        },
      },
    });

    apiResponse.success(res, created, 201);
  } catch (error) {
    next(error);
  }
}

export const smartListsController = {
  create,
};
