import { COLORS_OPTIONS } from './helpers';
import { Attribute, Category, PrismaClient, SmartListFilter } from '@prisma/client';

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

export async function seedAttributes(prisma: PrismaClient, smartListFilters: Array<SmartListFilter>, categories: Array<Category>) {
  console.log('Seeding attributes...');

  const attributesData: Array<Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>> = [];

  for (const smartListFilter of smartListFilters) {
    // For each smart list filter, create 5 attributes with category-like values
    for (let i = 0; i < 5; i++) {
      const category = categories[i % categories.length];
      const color = COLORS_OPTIONS[i % COLORS_OPTIONS.length];

      attributesData.push({
        value: attributeValues[i % attributeValues.length].value,
        description: attributeValues[i % attributeValues.length].description,
        categoryId: category.id,
        smartListFilterId: smartListFilter.id,
        color,
      });
    }
  }

  const { count } = await prisma.attribute.createMany({
    data: attributesData,
  });

  console.log(`Attributes seeded successfully! Count: ${count}`);

  return await prisma.attribute.findMany();
}
