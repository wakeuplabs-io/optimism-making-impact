import { COLORS_OPTIONS } from './helpers';
import { Attribute, Category, PrismaClient, SmartList } from '@prisma/client';

const attributeValues = [
  'Cryptocurrency',
  'Smart Contracts',
  'Decentralized Exchange',
  'Oracle Network',
  'Lending Protocol',
  'Blockchain Interoperability',
  'Decentralized Application',
];

export async function seedAttributes(prisma: PrismaClient, smartLists: Array<SmartList>, categories: Array<Category>) {
  console.log('Seeding attributes...');

  const attributesData: Array<Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>> = [];

  // Iterate through each smart list
  for (const smartList of smartLists) {
    // For each smart list, create 5 attributes with category-like values
    for (let i = 0; i < 5; i++) {
      const category = categories[i % categories.length]; // Dynamically assign categories (loop through if necessary)
      const color = COLORS_OPTIONS[i % COLORS_OPTIONS.length]; // Dynamically assign categories (loop through if necessary)

      attributesData.push({
        value: attributeValues[i % attributeValues.length], // Short, category-like value
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
