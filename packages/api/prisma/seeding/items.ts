import { COLORS_OPTIONS } from './helpers';
import { Item, PrismaClient, Step, StepType } from '@prisma/client';

const itemsData = [
  { markdown: 'The first and most well-known cryptocurrency.' },
  { markdown: 'A decentralized platform for building smart contracts and dApps.' },
  { markdown: 'A decentralized exchange protocol for swapping ERC-20 tokens.' },
  { markdown: 'A decentralized oracle network providing real-world data to smart contracts.' },
  { markdown: 'A decentralized lending protocol for borrowing and lending assets.' },
  { markdown: 'A multichain network protocol designed to connect different blockchains.' },
  { markdown: 'A platform for building decentralized applications and custom blockchain networks.' },
];

export async function seedItems(prisma: PrismaClient, steps: Array<Step>) {
  console.log('Seeding items...');

  const itemsToCreate: Array<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>> = [];
  let colorIndex = 0;

  for (const step of steps) {
    if (step.type !== StepType.ITEMS || !step.smartListId) continue;

    // Fetch attributes belonging to the step's SmartList
    const attributes = await prisma.attribute.findMany({
      where: {
        smartListId: step.smartListId,
      },
    });

    if (!attributes.length) {
      console.warn(`No attributes found for SmartList ${step.smartListId}, skipping step ${step.id}.`);
      continue;
    }

    let position = 0;

    for (const itemData of itemsData) {
      // Assign attributes cyclically from the filtered list
      const attribute = attributes[position % attributes.length];

      itemsToCreate.push({
        markdown: itemData.markdown,
        position: position++, // Increment position within each step
        stepId: step.id,
        attributeId: attribute.id, // Assign a valid attribute
        color: COLORS_OPTIONS[colorIndex % COLORS_OPTIONS.length], // Assign a color cyclically
      });

      colorIndex++;
    }
  }

  const { count } = await prisma.item.createMany({
    data: itemsToCreate,
    skipDuplicates: true,
  });

  console.log(`Seeding complete! A total of ${count} items were seeded.`);

  return await prisma.item.findMany();
}
