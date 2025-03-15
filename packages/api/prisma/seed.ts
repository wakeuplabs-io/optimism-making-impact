import { seedCards } from './seeding/cards';
import { seedCategories } from './seeding/categories';
import { seedInfographics } from './seeding/infographics';
import { seedItems } from './seeding/items';
import { seedRounds } from './seeding/rounds';
import { seedSteps } from './seeding/steps';
import { seedUserWhitelist } from './seeding/user-whitelist';
import { PrismaClient } from '@optimism-making-impact/prisma';

const prisma = new PrismaClient();

export async function seedDatabase() {
  console.log('Seeding database...');

  const rounds = await seedRounds(prisma);
  const categories = await seedCategories(prisma, rounds);
  const steps = await seedSteps(prisma, categories);
  await seedInfographics(prisma, steps);
  await seedCards(prisma, steps);
  await seedItems(prisma, steps);
  await seedUserWhitelist(prisma);

  console.log('Seeding complete!');
}

seedDatabase()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
