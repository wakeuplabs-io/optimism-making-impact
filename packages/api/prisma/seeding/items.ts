import { COLORS_OPTIONS } from './helpers';
import { PrismaClient, Step, StepType } from '@prisma/client';

const itemsData = [
  { markdown: 'The first and most well-known cryptocurrency.' },
  { markdown: 'A decentralized platform for building smart contracts and dApps.' },
  { markdown: 'A decentralized exchange protocol for swapping ERC-20 tokens.' },
  { markdown: 'A decentralized oracle network providing real-world data to smart contracts.' },
  { markdown: 'A decentralized lending protocol for borrowing and lending assets.' },
  { markdown: 'A multichain network protocol designed to connect different blockchains.' },
  { markdown: 'A platform for building decentralized applications and custom blockchain networks.' },
];

const attributeValues = [
  { value: 'Cryptocurrency', description: 'Digital or virtual currency secured by cryptography.' },
  { value: 'Smart Contracts', description: 'Self-executing contracts with the terms of the agreement directly written into code.' },
  { value: 'Decentralized Exchange', description: 'A peer-to-peer marketplace for trading cryptocurrencies without intermediaries.' },
  { value: 'Oracle Network', description: 'A service that connects blockchain smart contracts with real-world data.' },
  { value: 'Lending Protocol', description: 'Platforms that enable users to borrow or lend cryptocurrencies.' },
  {
    value: 'Blockchain Interoperability',
    description: 'The ability of different blockchain networks to exchange data and interact seamlessly.',
  },
  { value: 'Decentralized Application', description: 'Applications that run on a blockchain network, providing decentralized services.' },
];

export async function seedItems(prisma: PrismaClient, steps: Array<Step>) {
  console.log('Seeding items with smart lists and attributes...');

  for (const step of steps) {
    if (step.type !== StepType.SMARTLIST) continue;

    const smartListFilter = await prisma.smartListFilter.create({
      data: {
        title: step.title,
        steps: { connect: { id: step.id } },
      },
    });

    const shuffledAttributes = attributeValues.sort(() => 0.5 - Math.random()).slice(0, 5);
    const shuffledColors = COLORS_OPTIONS.sort(() => 0.5 - Math.random());

    await prisma.attribute.createMany({
      data: shuffledAttributes.map((attr, index) => ({
        value: attr.value,
        description: attr.description,
        color: shuffledColors[index % shuffledColors.length],
        smartListFilterId: smartListFilter.id,
        categoryId: 1, // HARDCODED:
      })),
    });

    const createdAttributes = await prisma.attribute.findMany({
      where: { smartListFilterId: smartListFilter.id },
    });

    // Create items and link them to attributes
    for (const [index, itemData] of itemsData.entries()) {
      const attribute = createdAttributes[index % createdAttributes.length];

      await prisma.item.create({
        data: {
          markdown: itemData.markdown,
          stepId: step.id,
          attributeId: attribute.id,
        },
      });
    }
  }

  const totalSmartListFilters = await prisma.smartListFilter.count();
  const totalAttributes = await prisma.attribute.count();
  const totalItems = await prisma.item.count();

  console.log('Seeding items with smart lists and attributes completed');

  console.log(`${totalSmartListFilters} smart lists seeded successfully!`);
  console.log(`${totalAttributes} attributes seeded successfully!`);
  console.log(`${totalItems} items seeded successfully!`);
}
