import { createCardBodySchema, updateCardBodySchema } from '@/controllers/cards/schemas.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas/common.js';
import { Keyword } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createCardBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const lastCard = await prisma.card.findFirst({
      where: { stepId: parsed.data.stepId },
      orderBy: { position: 'desc' },
      select: { position: true },
    });

    const lastCardPosition = lastCard ? lastCard.position + 1 : 0;

    const keywordsWithId = parsed.data.keywords.filter((keyword): keyword is Keyword => keyword.id !== undefined);
    const newKeywords = parsed.data.keywords.filter((keyword) => keyword.id === undefined);

    const created = await prisma.card.create({
      data: {
        markdown: parsed.data.markdown,
        strength: parsed.data.strength,
        title: parsed.data.title,
        stepId: parsed.data.stepId,
        attributeId: parsed.data.attributeId,
        position: lastCardPosition,
        keywords: {
          connect: keywordsWithId.map(({ id }) => ({ id })),
          create: newKeywords.map(({ value }) => ({ value })),
        },
      },
    });

    apiResponse.success(res, created, 201);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedId = idParamsSchema.safeParse(req.params);
    const parsed = updateCardBodySchema.safeParse(req.body);

    if (!parsed.success || !parsedId.success) throw ApiError.badRequest();

    const keywordsWithId = parsed.data.keywords.filter((keyword): keyword is Keyword => keyword.id !== undefined);
    const newKeywords = parsed.data.keywords.filter((keyword) => keyword.id === undefined);

    const updated = await prisma.card.update({
      where: { id: parsedId.data.id },
      data: {
        markdown: parsed.data.markdown,
        strength: parsed.data.strength,
        title: parsed.data.title,
        attributeId: parsed.data.attributeId,
        keywords: {
          set: [],
          connect: keywordsWithId.map(({ id }) => ({ id })),
          create: newKeywords.map(({ value }) => ({ value })),
        },
      },
    });

    apiResponse.success(res, updated, 201);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedId = idParamsSchema.safeParse(req.params);

    if (!parsedId.success) throw ApiError.badRequest();

    const deleted = await prisma.card.delete({
      where: { id: parsedId.data.id },
    });

    apiResponse.success(res, deleted, 201);
  } catch (error) {
    next(error);
  }
}

export const cardsController = {
  create,
  update,
  deleteOne,
};
