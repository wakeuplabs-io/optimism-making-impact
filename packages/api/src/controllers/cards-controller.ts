import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma/instance.js';
import { idParamsSchema } from '@/lib/schemas.js';
import { createCardBodySchema, updateCardBodySchema } from '@optimism-making-impact/schemas';
import { Keyword } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createCardBodySchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();

    const keywordsWithId = parsed.data.keywords.filter((keyword): keyword is Keyword => keyword.id !== undefined);
    const newKeywords = parsed.data.keywords.filter((keyword) => keyword.id === undefined);

    const created = await prisma.card.create({
      data: {
        markdown: parsed.data.markdown,
        strength: parsed.data.strength,
        title: parsed.data.title,
        stepId: parsed.data.stepId,
        attributeId: parsed.data.attributeId,
        keywords: {
          connect: keywordsWithId.map(({ id }) => ({ id })),
          create: newKeywords.map(({ value }) => ({ value, stepId: parsed.data.stepId })),
        },
      },
    });

    apiResponse.success(res, created, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function getKeywordsToRemoveIds(cardId: number, updatedKeywords?: Keyword[]): Promise<number[]> {
  // Fetch card keywords that were not present in the updated step keywords;
  const card = await prisma.card.findFirst({
    where: { id: cardId },
    select: {
      id: true,
      keywords: {
        where: { id: { notIn: (updatedKeywords ?? []).map(({ id }) => id) } },
        select: { id: true, cards: { select: { id: true } } },
      },
    },
  });

  // keep only keywords that are not present in other cards
  const keywordsToRemove = card?.keywords.filter((keyword) => keyword.cards.length === 1).map(({ id }) => id) ?? [];

  return keywordsToRemove;
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedId = idParamsSchema.safeParse(req.params);
    const parsed = updateCardBodySchema.safeParse(req.body);

    if (!parsed.success || !parsedId.success) throw ApiError.badRequest();

    const keywordsWithId = parsed.data.keywords.filter((keyword): keyword is Keyword => keyword.id !== undefined);
    const newKeywords = parsed.data.keywords.filter((keyword) => keyword.id === undefined);
    const keywordsToRemove = await getKeywordsToRemoveIds(parsedId.data.id, keywordsWithId);

    const updated = await prisma.$transaction(async (tx) => {
      //update card
      const updated = await tx.card.update({
        where: { id: parsedId.data.id },
        data: {
          markdown: parsed.data.markdown,
          strength: parsed.data.strength,
          title: parsed.data.title,
          attributeId: parsed.data.attributeId,
          keywords: {
            set: [],
            connect: keywordsWithId.map(({ id }) => ({ id })),
            create: newKeywords.map(({ value }) => ({ value, stepId: parsed.data.stepId })),
          },
        },
      });

      //delete keywords
      if (keywordsToRemove.length > 0) {
        await tx.keyword.deleteMany({
          where: {
            id: {
              in: keywordsToRemove,
            },
            stepId: parsed.data.stepId,
          },
        });
      }

      return updated;
    });

    apiResponse.success(res, updated, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedId = idParamsSchema.safeParse(req.params);

    if (!parsedId.success) throw ApiError.badRequest();

    const keywordsToRemove = await getKeywordsToRemoveIds(parsedId.data.id);

    const deleted = await prisma.$transaction(async (tx) => {
      const deleted = await tx.card.delete({
        where: { id: parsedId.data.id },
      });

      if (keywordsToRemove.length > 0) {
        await tx.keyword.deleteMany({
          where: {
            id: {
              in: keywordsToRemove,
            },
          },
        });
      }

      return deleted;
    });

    apiResponse.success(res, deleted, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

export const cardsController = {
  create,
  update,
  deleteOne,
};
