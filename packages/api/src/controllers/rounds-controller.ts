import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma-instance.js';
import {
  Attribute,
  Card,
  Category,
  Infographic,
  Item,
  Keyword,
  PrismaClient,
  Round,
  SmartListFilter,
  Step,
} from '@optimism-making-impact/prisma';
import { idParamsSchema, updateRoundBodySchema } from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const rounds = await prisma.round.findMany({
      orderBy: { id: 'desc' },
      include: {
        categories: {
          orderBy: { id: 'asc' },
        },
      },
    });

    apiResponse.success(res, { rounds });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lastRound = await getLastCompleteRound();

    if (!lastRound) {
      await prisma.round.create({ data: { link1: 'https://vote.optimism.io/', link2: 'https://retrolist.app/' } });
    } else {
      await duplicateRound(lastRound);
    }

    apiResponse.success(res, { message: 'Round created successfully' }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);
    const parsedBody = updateRoundBodySchema.safeParse(req.body);

    if (!parsedParams.success || !parsedBody.success) throw ApiError.badRequest();

    const edited = await prisma.round.update({
      where: {
        id: Number(parsedParams.data.id),
      },
      data: parsedBody.data,
    });

    apiResponse.success(res, { message: 'Round edited successfully', data: edited }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedParams = idParamsSchema.safeParse(req.params);

    if (!parsedParams.success) throw ApiError.badRequest();

    const deleted = await prisma.round.delete({
      where: {
        id: Number(parsedParams.data.id),
      },
    });

    apiResponse.success(res, { message: 'Round deleted.', data: deleted }, StatusCodes.CREATED);
  } catch (error) {
    next(error);
  }
}

// Helpers
/**
 * Fetches a complete round from the database, including all associated categories, steps, smart lists, infographics, items, cards, attributes, and keywords, if exists.
 * @param {number} roundId - The ID of the round to fetch.
 * @returns {Promise<CompleteRound>} A promise that resolves to the fetched round.
 * @throws {Prisma.PrismaClientKnownRequestError} If the round does not exist.
 */
function getCompleteRound(roundId: number): Promise<CompleteRound | null> {
  return prisma.round.findUnique({
    where: { id: roundId },
    include: {
      categories: {
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        include: {
          steps: {
            orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
            include: {
              infographics: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
              items: {
                include: { attribute: true },
                orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
              },
              cards: {
                include: {
                  attribute: true,
                  keywords: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
                },
                orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
              },
              smartListFilter: {
                include: {
                  attributes: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
                },
              },
            },
          },
        },
      },
    },
  });
}

/**
 * Fetches the most recent round (including categories, steps, attributes, smart lists, infographics, items, and cards).
 * @returns The most recent round.
 * @throws If no round exists.
 */
async function getLastCompleteRound(): Promise<CompleteRound | null> {
  const lastRoundId = await prisma.round.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true },
  });

  if (!lastRoundId) return null;

  return getCompleteRound(lastRoundId.id);
}

type Tx = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

type CompleteStep = Step & {
  infographics: Infographic[];
  items: (Item & { attribute: Attribute | null })[];
  cards: (Card & { keywords: Keyword[]; attribute: Attribute | null })[];
  smartListFilter?: (SmartListFilter & { attributes: Attribute[] }) | null;
};

type CompleteCategory = Category & {
  steps: CompleteStep[];
};

type CompleteRound = Round & {
  categories: CompleteCategory[];
};

/**
 * Duplicates an entire round along with all its nested entities sequentially.
 * @param originalRound The round to duplicate.
 * @returns The newly created round ID.
 */
async function duplicateRound(originalRound: CompleteRound): Promise<number> {
  return await prisma.$transaction(
    async (tx: Tx) => {
      const newRound = await duplicateRoundRecord(tx, originalRound);

      for (const category of originalRound.categories) {
        const newCategory = await duplicateCategory(tx, category, newRound.id);

        await duplicateSteps(tx, category.steps, newCategory);
      }

      return newRound.id;
    },
    {
      timeout: 30_000,
    },
  );
}

async function duplicateRoundRecord(tx: Tx, round: Round): Promise<Round> {
  return tx.round.create({
    data: {
      link1: round.link1,
      link2: round.link2,
    },
  });
}

async function duplicateCategory(tx: Tx, category: CompleteCategory, newRoundId: number): Promise<Category> {
  return tx.category.create({
    data: {
      name: category.name,
      icon: category.icon,
      roundId: newRoundId,
    },
  });
}

async function duplicateSteps(tx: Tx, steps: CompleteStep[], newCategory: Category): Promise<void> {
  // dictionary matching old id and new attributes
  const oldSmartFiltersIdMap: { [oldId: number]: { attributes: Attribute[]; newId: number } } = {};

  for (const step of steps) {
    const newStep = await tx.step.create({
      data: {
        title: step.title,
        icon: step.icon,
        type: step.type,
        categoryId: newCategory.id,
      },
    });

    if (step.smartListFilter != null) {
      if (!oldSmartFiltersIdMap[step.smartListFilter.id]) {
        const { newSmartList, newAttributes: attributes } = await duplicateSmartListFilter(tx, step.smartListFilter);
        oldSmartFiltersIdMap[step.smartListFilter.id] = { attributes, newId: newSmartList.id };
        await tx.step.update({
          where: { id: newStep.id },
          data: { smartListFilterId: newSmartList.id },
        });
      } else {
        const existingSmartListId = oldSmartFiltersIdMap[step.smartListFilter.id].newId;
        await tx.step.update({
          where: { id: newStep.id },
          data: { smartListFilterId: existingSmartListId },
        });
      }
    }

    for (const infographic of step.infographics) {
      await duplicateInfographic(tx, infographic, newStep.id);
    }

    for (const item of step.items) {
      let newAttributes: Attribute[] = [];
      if (step.smartListFilter) newAttributes = oldSmartFiltersIdMap[step.smartListFilter.id].attributes;

      await duplicateItem(tx, item, newStep.id, newAttributes);
    }

    for (const card of step.cards) {
      let newAttributes: Attribute[] = [];
      if (step.smartListFilter) newAttributes = oldSmartFiltersIdMap[step.smartListFilter.id].attributes;

      const newCard = await duplicateCard(tx, card, newStep.id, newAttributes);
      for (const kw of card.keywords) {
        await duplicateKeyword(tx, kw, newCard.id, newStep.id);
      }
    }
  }
}

async function duplicateSmartListFilter(
  tx: Tx,
  smartListFilter: NonNullable<CompleteStep['smartListFilter']>,
): Promise<{ newSmartList: SmartListFilter; newAttributes: Attribute[] }> {
  const newSmartList = await tx.smartListFilter.create({
    data: { title: smartListFilter.title },
  });
  const newAttributes: Attribute[] = [];
  for (const attr of smartListFilter.attributes) {
    const newAttr = await tx.attribute.create({
      data: {
        value: attr.value,
        description: attr.description,
        color: attr.color,
        smartListFilterId: newSmartList.id,
      },
    });
    newAttributes.push(newAttr);
  }
  return { newSmartList, newAttributes };
}

async function duplicateInfographic(tx: Tx, infographic: Infographic, newStepId: number): Promise<void> {
  await tx.infographic.create({
    data: {
      image: infographic.image,
      markdown: infographic.markdown,
      step: { connect: { id: newStepId } },
    },
  });
}

async function duplicateItem(
  tx: Tx,
  item: Item & { attribute: Attribute | null },
  newStepId: number,
  newAttributes: Attribute[],
): Promise<void> {
  let attributeConnect = undefined;

  // Directly accessing item.attribute may not guarantee type narrowing because it might be re-read
  // or considered mutable. The local constant 'attr' provides a stable reference that, once checked,
  // is treated as non-null in the subsequent code.
  const attr = item.attribute;

  if (attr !== null && attr !== undefined) {
    const match = newAttributes.find((a) => a.value === attr.value && a.description === attr.description && a.color === attr.color);
    if (match) {
      attributeConnect = { connect: { id: match.id } };
    }
  }
  await tx.item.create({
    data: {
      markdown: item.markdown,
      step: { connect: { id: newStepId } },
      ...(attributeConnect ? { attribute: attributeConnect } : {}),
    },
  });
}

async function duplicateCard(
  tx: Tx,
  card: Card & { keywords: Keyword[]; attribute: Attribute | null },
  newStepId: number,
  newAttributes: Attribute[],
): Promise<Card> {
  let attributeConnect = undefined;

  // Directly accessing card.attribute may not guarantee type narrowing because it might be re-read
  // or considered mutable. The local constant 'attr' provides a stable reference that, once checked,
  // is treated as non-null in the subsequent code.
  const attr = card.attribute;

  if (attr !== null && attr !== undefined) {
    const match = newAttributes.find((a) => a.value === attr.value && a.description === attr.description && a.color === attr.color);
    if (match) {
      attributeConnect = { connect: { id: match.id } };
    }
  }
  return await tx.card.create({
    data: {
      title: card.title,
      markdown: card.markdown,
      strength: card.strength,
      step: { connect: { id: newStepId } },
      ...(attributeConnect ? { attribute: attributeConnect } : {}),
    },
  });
}

async function duplicateKeyword(tx: Tx, keyword: Keyword, newCardId: number, newStepId: number): Promise<void> {
  await tx.card.update({
    where: { id: newCardId },
    data: {
      keywords: {
        connectOrCreate: {
          where: { value_stepId: { value: keyword.value, stepId: newStepId } },
          create: { value: keyword.value, stepId: newStepId },
        },
      },
    },
  });
}

export const roundsController = {
  getAll,
  create,
  update,
  deleteOne,
};
