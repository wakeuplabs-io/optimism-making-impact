import { createCardBodySchema } from '@/controllers/cards/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { NextFunction, Request, Response } from 'express';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createCardBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const lastCard = await prisma.card.findFirst({
      where: { stepId: parsed.data.stepId },
      orderBy: { position: 'desc' },
    });

    const lastCardPosition = lastCard ? lastCard.position + 1 : 0;

    const created = await prisma.card.create({
      data: {
        markdown: parsed.data.markdown,
        strength: parsed.data.strength,
        title: parsed.data.title,
        stepId: parsed.data.stepId,
        attributeId: parsed.data.attributeId,
        position: lastCardPosition,
        keywords: {
          connectOrCreate: parsed.data.keywords.map((keyword) => ({
            where: { id: keyword.id },
            create: { value: keyword.value },
          })),
        },
      },
    });

    apiResponse.success(res, created, 201);
  } catch (error) {
    next(error);
  }
}

export const cardsController = {
  create,
};
