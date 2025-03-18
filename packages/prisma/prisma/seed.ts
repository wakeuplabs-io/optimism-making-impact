import { seedDatabase } from '../src/seeding';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

seedDatabase()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
