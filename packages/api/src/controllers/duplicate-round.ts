import { prisma } from '@/lib/prisma/instance.js';
import { extractKeywordData } from '@/lib/utils/index.js';
import { CompleteRound } from '@/types/entities/round.js';
import { CompleteStep } from '@/types/entities/step.js';
import { Category, Round, SmartList } from '@prisma/client';

/**
 * Fetches the most recent round (including categories, steps, attributes, smart lists, infographies, items, and cards).
 * @returns The most recent round.
 * @throws If no round exists.
 */
export async function fetchLastCompleteRound(): Promise<CompleteRound> {
  return prisma.round.findFirstOrThrow({
    orderBy: { id: 'desc' },
    include: {
      categories: { include: { attributes: true } },
      steps: {
        include: {
          smartList: { include: { attributes: true } },
          infographies: true,
          items: { include: { attribute: true } },
          cards: { include: { attribute: true, keywords: true } },
        },
      },
    },
  });
}

/**
 * Duplicates the given round and its associated categories, steps, smart lists, keywords, and attributes.
 * Returns the newly created round, categories, steps, and smart lists.
 * @param lastRound The round to duplicate.
 * @returns The newly created round, categories, steps, and smart lists.
 */
export async function duplicateRound(lastRound: CompleteRound): Promise<number> {
  const newRound = await createRound(lastRound);
  await createCategoriesForRound(lastRound.categories, newRound.id);
  const { oldToNewAttributeIds, oldToNewSmartListIds } = await createSmartListsFromSteps(lastRound.steps);
  const oldToNewKeywordIds = await duplicateKeywords(lastRound.steps);
  await createStepsForRound(lastRound.steps, newRound.id, oldToNewSmartListIds, oldToNewAttributeIds, oldToNewKeywordIds);

  return newRound.id;
}

// --------------------------------------------------------
// Fetch the Last Round (DONE)
// If No Round Exists Create a New Round empty (DONE)
// Create a New Round from previous (DONE)
// Create Categories (DONE)
// Duplicate Smart Lists (DONE)
// Create Attributes for Categories (TODO:)
// Create New Steps (DONE)
// Duplicate Keywords (DONE)
// Populate Steps with Infographies, Items, Cards (DONE)
// -----------------------------
// --------------------------------------------------------

async function createRound(prevRound: Round): Promise<Round> {
  return prisma.round.create({
    data: {
      link1: prevRound.link1,
      link2: prevRound.link2,
    },
  });
}

async function createCategoriesForRound(categories: Category[], roundId: number): Promise<Category[]> {
  const createdCategories: Category[] = [];

  for (const category of categories) {
    const newCategory = await prisma.category.create({
      data: {
        name: category.name,
        icon: category.icon,
        roundId: roundId,
      },
    });
    createdCategories.push(newCategory);
  }

  return createdCategories;
}

async function createSmartListsFromSteps(steps: CompleteStep[]): Promise<{
  createdSmartLists: SmartList[];
  oldToNewSmartListIds: Record<number, number>;
  oldToNewAttributeIds: Record<number, number>;
}> {
  const createdSmartLists: SmartList[] = [];
  const oldToNewSmartListIds: Record<number, number> = {};
  const oldToNewAttributeIds: Record<number, number> = {};

  // Loop over each step to duplicate the SmartList (if it exists).
  for (const step of steps) {
    const { smartList } = step;

    if (!smartList) {
      continue; // This step doesn't have a SmartList, skip it.
    }

    // 1) Create the new SmartList (top-level data only).
    const newSmartList = await prisma.smartList.create({ data: { title: smartList.title } });

    // Store the newly created SmartList and the ID mapping.
    createdSmartLists.push(newSmartList);
    oldToNewSmartListIds[smartList.id] = newSmartList.id;

    // 2) Create *new* Attributes for this newly created SmartList and build an old->new ID mapping for attributes as well.
    for (const oldAttr of smartList.attributes) {
      const newAttr = await prisma.attribute.create({
        data: {
          value: oldAttr.value,
          description: oldAttr.description,
          color: oldAttr.color,
          categoryId: oldAttr.categoryId, // or map categoryId if needed
          smartListId: newSmartList.id, // connect to the *new* SmartList
        },
      });

      oldToNewAttributeIds[oldAttr.id] = newAttr.id;
    }
  }

  return {
    createdSmartLists,
    oldToNewSmartListIds,
    oldToNewAttributeIds,
  };
}

async function duplicateKeywords(steps: CompleteStep[]): Promise<Record<number, number>> {
  // Gather all unique keywords from steps and build a dictionary to store oldId -> newId
  const { keywordIds: oldKeywordIds, keywordMap } = extractKeywordData(steps);
  const oldToNewKeywordIds: Record<number, number> = {};

  // Now create each new keyword in the database
  for (const oldId of oldKeywordIds) {
    const oldKeyword = keywordMap.get(oldId);

    if (!oldKeyword) continue; // This shouldn't happen if data is consistent

    const newKeyword = await prisma.keyword.create({
      data: { value: oldKeyword.value },
    });

    oldToNewKeywordIds[oldId] = newKeyword.id;
  }

  return oldToNewKeywordIds;
}

async function createStepsForRound(
  steps: CompleteStep[],
  roundId: number,
  oldToNewSmartListIds: Record<number, number>,
  oldToNewAttributeIds: Record<number, number>,
  oldToNewKeywordIds: Record<number, number>,
) {
  const createdStepsPromises = [];

  for (const step of steps) {
    const newStep = prisma.step.create({
      data: {
        title: step.title,
        icon: step.icon,
        position: step.position,
        type: step.type,
        roundId: roundId,
        smartListId: step.smartListId ? oldToNewSmartListIds[step.smartListId] : null,
        infographies: {
          create: step.infographies.map(({ image, markdown, position }) => ({ image, markdown, position })),
        },
        cards: {
          create: step.cards.map(({ strength, markdown, position, title, attributeId, keywords }) => ({
            strength,
            markdown,
            position,
            title,
            attributeId: attributeId ? oldToNewAttributeIds[attributeId] : null,
            keywords: {
              connect: keywords.map((oldKw) => ({
                id: oldToNewKeywordIds[oldKw.id], // connect to the newly created keyword
              })),
            },
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
      },
      include: {
        smartList: {
          include: {
            attributes: true,
          },
        },
      },
    });

    createdStepsPromises.push(newStep);
  }

  const createdSteps = await Promise.all(createdStepsPromises);

  return createdSteps;
}
