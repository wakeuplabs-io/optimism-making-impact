import { COLORS_OPTIONS } from './helpers';
import { Attribute, Category, PrismaClient, SmartList } from '@prisma/client';

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

export async function seedAttributes(prisma: PrismaClient, smartLists: Array<SmartList>, categories: Array<Category>) {
  console.log('Seeding attributes...');

  const attributesData: Array<Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>> = [];

  // Iterate through each smart list
  for (const smartList of smartLists) {
    // For each smart list, create 5 attributes with category-like values
    for (let i = 0; i < 5; i++) {
      const category = categories[i % categories.length]; // Dynamically assign categories (loop through if necessary)
      const color = COLORS_OPTIONS[i % COLORS_OPTIONS.length]; // Dynamically assign colors (loop through if necessary)

      attributesData.push({
        value: attributeValues[i % attributeValues.length].value, // Short, category-like value
        description: attributeValues[i % attributeValues.length].description, // Add the corresponding description
        categoryId: category.id, // Use dynamic category ID
        smartListId: smartList.id, // Assign the attribute to the smart list
        color,
      });
    }
  }

  // Create many attributes at once
  const { count } = await prisma.attribute.createMany({
    data: attributesData,
  });

  console.log(`Attributes seeded successfully! Count: ${count}`);

  // Query the database to fetch all attributes
  return await prisma.attribute.findMany();
}
