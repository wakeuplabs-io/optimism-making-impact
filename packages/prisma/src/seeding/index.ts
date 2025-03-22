import { seedCards } from './cards';
import { seedCategories } from './categories';
import { seedInfographics } from './infographics';
import { seedItems } from './items';
import { seedRounds } from './rounds';
import { seedSteps } from './steps';
import { seedUserWhitelist } from './user-whitelist';
import { PrismaClient } from '@prisma/client';

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
