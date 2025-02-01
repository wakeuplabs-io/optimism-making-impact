import { PrismaClient } from '@prisma/client';

const roundsData = [
  { link1: 'https://www.google.com', link2: 'https://www.wakeuplabs.io/' },
  { link1: 'https://www.google.com', link2: 'https://www.wakeuplabs.io/' },
  { link1: 'https://www.google.com', link2: 'https://www.wakeuplabs.io/' },
];

export async function seedRounds(prisma: PrismaClient) {
  console.log('Seeding rounds...');

  const { count } = await prisma.round.createMany({
    data: roundsData,
    skipDuplicates: true, // Avoid errors if the script is run multiple times
  });

  console.log(`${count} rounds seeded successfully!`);

  // Return created rounds for confirmation (optional)
  return prisma.round.findMany();
}
