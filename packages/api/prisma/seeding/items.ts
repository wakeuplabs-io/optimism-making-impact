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
  let colorIndex = 0; // Initialize a color index to cycle through colors

  for (const step of steps) {
    if (step.type !== StepType.ITEMS) continue; // Only create items for ITEM type steps

    let position = 0;

    for (const itemData of itemsData) {
      itemsToCreate.push({
        markdown: itemData.markdown,
        position: position++, // Increment position within each step
        stepId: step.id,
        attributeId: null, // Placeholder for now, no attribute associated
        color: COLORS_OPTIONS[colorIndex % COLORS_OPTIONS.length], // Assign a color cyclically
      });

      colorIndex++; // Increment the color index to move to the next color
    }
  }

  const { count } = await prisma.item.createMany({
    data: itemsToCreate,
    skipDuplicates: true, // Skip duplicate items in case there are any
  });

  console.log(`Seeding complete! A total of ${count} items were seeded.`);

  return await prisma.item.findMany();
}
