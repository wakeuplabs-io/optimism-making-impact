import { seedCards } from './seeding/cards';
import { seedCategories } from './seeding/categories';
import { seedInfographics } from './seeding/infographics';
import { seedItems } from './seeding/items';
import { seedKeywords } from './seeding/keywords';
import { seedRounds } from './seeding/rounds';
import { seedSteps } from './seeding/steps';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDatabase() {
  console.log('Seeding database...');

  const keywords = await seedKeywords(prisma);

  const rounds = await seedRounds(prisma);
  const categories = await seedCategories(prisma, rounds);
  const steps = await seedSteps(prisma, categories);
  await seedInfographics(prisma, steps);
  await seedCards(prisma, steps, keywords);
  await seedItems(prisma, steps);

  console.log('Seeding complete!');
}

seedDatabase()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
