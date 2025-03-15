import { PrismaClient } from '@optimism-making-impact/prisma';

const userWhiteListData = [
  { email: 'chris@wakeuplabs.io' },
  { email: 'fdelorenzo.dev@gmail.com' },
  { email: 'gonza@wakeuplabs.io' },
  { email: 'kleckiax@gmail.com' },
  { email: 'martincatala14@gmail.com' },
  { email: 'matias.barro@gmail.com' },
  { email: 'milton@wakeuplabs.io' },
  { email: 'perezcerraluciano@gmail.com' },
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
