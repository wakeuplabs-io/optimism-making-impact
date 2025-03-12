import { prisma } from '@/lib/prisma/instance.js';
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

  // Step 3: Duplicate Items and Cards and infographics
  await createStepsWithRelationsForCategories(lastRound.categories, oldToNewCategoryMap, oldToNewAttributeIds, oldToNewSmartListIds);

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
    if (!step.smartListFilter) {
      continue;
    }

    const newSmartList = await prisma.smartListFilter.create({
      data: { title: step.smartListFilter.title },
    });

    smartListMap[step.smartListFilter.id] = newSmartList.id;

    for (const oldAttr of step.smartListFilter.attributes) {
      const newAttr = await prisma.attribute.create({
        data: {
          value: oldAttr.value,
          description: oldAttr.description,
          color: oldAttr.color,
          categoryId: oldAttr.categoryId, // Ensure correct category linking
          smartListFilterId: newSmartList.id,
        },
      });

      attributeMap[oldAttr.id] = newAttr.id;
    }
  }

  return { oldToNewSmartListIds: smartListMap, oldToNewAttributeIds: attributeMap };
}

async function createStepsWithRelationsForCategories(
  oldCategories: CompleteCategory[],
  oldToNewCategoryMap: Record<number, number>,
  oldToNewAttributeIds: Record<number, number>,
  oldToNewSmartListIds: Record<number, number>,
) {
  const stepMap: Record<number, number> = [];

  await prisma.$transaction(async (tx) => {
    for (const oldCategory of oldCategories) {
      for (const step of oldCategory.steps) {
        const newStep = await tx.step.create({
          data: {
            title: step.title,
            icon: step.icon,
            type: step.type,
            categoryId: oldToNewCategoryMap[step.categoryId], // ✅ Correct category mapping
            smartListFilterId: step.smartListFilter ? oldToNewSmartListIds[step.smartListFilter.id] : null,
            infographics: {
              create: step.infographics.map(({ image, markdown }) => ({
                image,
                markdown,
              })),
            },
            items: {
              create: step.items.map(({ markdown, attributeId }) => ({
                markdown,
                ...(attributeId && {
                  attribute: { connect: { id: oldToNewAttributeIds[attributeId] } },
                }),
              })),
            },
          },
        });

        await tx.step.update({
          where: { id: newStep.id },
          data: {
            cards: {
              create: step.cards.map(({ strength, markdown, title, attributeId, keywords }) => ({
                strength,
                markdown,
                title,
                attribute: attributeId ? { connect: { id: oldToNewAttributeIds[attributeId] } } : undefined,
                keywords: {
                  connectOrCreate: keywords.map((kw) => ({
                    where: { value_stepId: { value: kw.value, stepId: newStep.id } },
                    create: { value: kw.value, stepId: newStep.id },
                  })),
                },
              })),
            },
          },
        });

        stepMap[step.id] = newStep.id;
      }
    }
  });

  return stepMap;
}
