import { prisma } from '@/lib/prisma/instance.js';
import { extractKeywordData } from '@/lib/utils/index.js';
import { CompleteCategory } from '@/types/entities/categories.js';
import { CompleteRound } from '@/types/entities/round.js';
import { CompleteStep } from '@/types/entities/step.js';
import { Category, Round } from '@prisma/client';

/**
 * Duplicates an entire round, including categories, steps, items, cards, and related entities.
 * Ensures relationships remain intact.
 * @param lastRound The round to duplicate.
 * @returns The newly created round ID.
 */
export async function duplicateRound(lastRound: CompleteRound): Promise<number> {
  const newRound = await createRound(lastRound);

  // Step 1: Duplicate Categories and store old-to-new mapping
  const oldToNewCategoryMap = await createCategoriesForRound(lastRound.categories, newRound.id);

  // Step 2: Duplicate Smart Lists and Attributes
  const { oldToNewSmartListIds, oldToNewAttributeIds } = await createSmartListsFromSteps(
    lastRound.categories.flatMap((category) => category.steps),
  );

  // Step 3: Duplicate Keywords
  const oldToNewKeywordIds = await duplicateKeywords(lastRound.categories.flatMap((category) => category.steps));

  // Step 4: Duplicate Items and Cards
  await createStepsWithRelationsForCategories(
    lastRound.categories,
    oldToNewCategoryMap,
    oldToNewAttributeIds,
    oldToNewKeywordIds,
    oldToNewSmartListIds,
  );

  return newRound.id;
}

async function createRound(prevRound: Round): Promise<Round> {
  return prisma.round.create({
    data: {
      link1: prevRound.link1,
      link2: prevRound.link2,
    },
  });
}

async function createCategoriesForRound(categories: Category[], newRoundId: number): Promise<Record<number, number>> {
  const categoryMap: Record<number, number> = {};

  for (const category of categories) {
    const newCategory = await prisma.category.create({
      data: {
        name: category.name,
        icon: category.icon,
        roundId: newRoundId,
      },
    });

    categoryMap[category.id] = newCategory.id;
  }

  return categoryMap;
}

async function createSmartListsFromSteps(steps: CompleteStep[]): Promise<{
  oldToNewSmartListIds: Record<number, number>;
  oldToNewAttributeIds: Record<number, number>;
}> {
  const smartListMap: Record<number, number> = {};
  const attributeMap: Record<number, number> = {};

  for (const step of steps) {
    if (!step.smartList) {
      continue;
    }

    const newSmartList = await prisma.smartList.create({
      data: { title: step.smartList.title },
    });

    smartListMap[step.smartList.id] = newSmartList.id;

    for (const oldAttr of step.smartList.attributes) {
      const newAttr = await prisma.attribute.create({
        data: {
          value: oldAttr.value,
          description: oldAttr.description,
          color: oldAttr.color,
          categoryId: oldAttr.categoryId, // Ensure correct category linking
          smartListId: newSmartList.id,
        },
      });

      attributeMap[oldAttr.id] = newAttr.id;
    }
  }

  return { oldToNewSmartListIds: smartListMap, oldToNewAttributeIds: attributeMap };
}

async function duplicateKeywords(steps: CompleteStep[]): Promise<Record<number, number>> {
  const { keywordIds: oldKeywordIds, keywordMap } = extractKeywordData(steps);
  const oldToNewKeywordIds: Record<number, number> = {}; // Renamed to avoid conflict

  for (const oldId of oldKeywordIds) {
    const oldKeyword = keywordMap.get(oldId);
    if (!oldKeyword) continue;

    const newKeyword = await prisma.keyword.create({
      data: { value: oldKeyword.value },
    });

    oldToNewKeywordIds[oldId] = newKeyword.id;
  }

  return oldToNewKeywordIds;
}

async function createStepsWithRelationsForCategories(
  oldCategories: CompleteCategory[],
  oldToNewCategoryMap: Record<number, number>,
  oldToNewAttributeIds: Record<number, number>,
  oldToNewKeywordIds: Record<number, number>,
  oldToNewSmartListIds: Record<number, number>,
) {
  const stepMap: Record<number, number> = {};
  const createdStepsPromises = [];

  for (const oldCategory of oldCategories) {
    for (const step of oldCategory.steps) {
      const newStepPromise = prisma.step.create({
        data: {
          title: step.title,
          icon: step.icon,
          position: step.position,
          type: step.type,
          categoryId: oldToNewCategoryMap[step.categoryId], // ✅ Correct category mapping
          smartListId: step.smartListId ? oldToNewSmartListIds[step.smartListId] : null,
          infographies: {
            create: step.infographies.map(({ image, markdown, position }) => ({
              image,
              markdown,
              position,
            })),
          },
          items: {
            create: step.items.map(({ markdown, position, attributeId }) => ({
              markdown,
              position,
              attribute: {
                connect: {
                  id: oldToNewAttributeIds[attributeId],
                },
              },
            })),
          },
          cards: {
            create: step.cards.map(({ strength, markdown, position, title, attributeId, keywords }) => ({
              strength,
              markdown,
              position,
              title,
              attribute: attributeId ? { connect: { id: oldToNewAttributeIds[attributeId] } } : undefined,
              keywords: {
                connect: keywords.map((kw) => ({ id: oldToNewKeywordIds[kw.id] })).filter((kw) => kw.id !== undefined),
              },
            })),
          },
        },
      });

      createdStepsPromises.push(newStepPromise);
    }
  }

  const createdSteps = await Promise.all(createdStepsPromises);
  createdSteps.forEach((newStep, index) => {
    stepMap[oldCategories.flatMap((c) => c.steps)[index].id] = newStep.id;
  });

  return stepMap;
}
