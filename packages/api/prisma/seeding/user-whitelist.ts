import { PrismaClient } from '@prisma/client';

const userWhiteListData = [
  { email: 'matias.barro@gmail.com' },
  { email: 'martincatala14@gmail.com' },
  { email: 'perezcerraluciano@gmail.com' },
  { email: 'fdelorenzo.dev@gmail.com' },
];

export async function seedUserWhitelist(prisma: PrismaClient) {
  console.log('Seeding user whitelist...');

  const { count } = await prisma.userWhitelist.createMany({
    data: userWhiteListData,
    skipDuplicates: true, // Avoid errors if the script is run multiple times
  });

  console.log(`${count} users seeded successfully!`);

  return prisma.userWhitelist.findMany();
}
