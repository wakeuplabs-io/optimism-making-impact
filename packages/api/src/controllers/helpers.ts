import { prisma } from '@/lib/prisma/instance.js';
import { Prisma } from '@prisma/client';

// Step 1: Fetch the latest round
export async function fetchLastRound() {
  return prisma.round.findFirst({
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

// Step 2: Create a new round with basic categories and steps
export async function createBasicRound(
  lastRound: Prisma.RoundGetPayload<{ include: { categories: true; steps: true } }>,
): Promise<Prisma.RoundGetPayload<{ include: { categories: true; steps: true } }>> {
  const { categories, steps } = lastRound;
  return prisma.round.create({
    data: {
      link1: lastRound.link1,
      link2: lastRound.link2,
      categories: {
        create: categories.map(({ name, icon }) => ({
          name,
          icon,
        })),
      },
      steps: {
        create: steps.map(({ title, icon, position, type }) => ({
          title,
          icon,
          position,
          type,
        })),
      },
    },
    include: {
      categories: true,
      steps: true,
    },
  });
}

// Step 3: Duplicate category attributes
export async function duplicateCategoryAttributes(
  categories: Prisma.CategoryGetPayload<{ include: { attributes: true } }>[],
  newRound: Prisma.RoundGetPayload<{ include: { categories: true } }>,
): Promise<void> {
  await Promise.all(
    categories.map(async (category, index) => {
      const newCategory = newRound.categories[index];
      await prisma.category.update({
        where: { id: newCategory.id },
        data: {
          attributes: {
            create: category.attributes.map(({ value, smartListId, description }) => ({
              value,
              description,
              smartList: { connect: { id: smartListId } },
            })),
          },
        },
      });
    }),
  );
}

// Step 4: Duplicate step content (infographies, items, and cards, including smartList duplication)
export async function duplicateStepContent(
  steps: Prisma.StepGetPayload<{
    include: {
      smartList: {
        include: {
          attributes: true;
        };
      };
      infographies: true;
      items: { include: { attribute: true } };
      cards: { include: { attribute: true; keywords: true } };
    };
  }>[],
  newRound: Prisma.RoundGetPayload<{ include: { steps: true } }>,
): Promise<void> {
  await Promise.all(
    steps.map(async (step, index) => {
      const newStep = newRound.steps[index];
      const smartList = step.smartList;

      // Duplicate SmartList if it exists
      let newSmartListId: number | undefined;
      if (smartList) {
        const newSmartList = await prisma.smartList.create({
          data: {
            title: smartList.title,
            attributes: {
              create: smartList.attributes.map(({ value, description, color, categoryId }) => ({
                value,
                description,
                color,
                categoryId,
              })),
            },
          },
        });
        newSmartListId = newSmartList.id;
      }

      await prisma.step.update({
        where: { id: newStep.id },
        data: {
          infographies: {
            create: step.infographies.map(({ markdown, image, position }) => ({
              markdown,
              image,
              position,
            })),
          },
          items: {
            create: step.items.map(({ markdown, position, attributeId }) => ({
              markdown,
              position,
              attributeId: attributeId ?? undefined,
            })),
          },
          cards: {
            create: step.cards.map(({ title, markdown, position, strength, attributeId, keywords }) => ({
              title,
              markdown,
              position,
              strength,
              attributeId: attributeId ?? undefined,
              keywords: { connect: keywords.map((keyword) => ({ id: keyword.id || undefined })) },
            })),
          },
          smartListId: newSmartListId ?? undefined,
        },
      });
    }),
  );
}
