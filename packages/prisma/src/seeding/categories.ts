import { PrismaClient, Prisma } from '@prisma/client';

const categoriesData = [
  { name: 'Technology', icon: 'Blocks' },
  { name: 'Innovation', icon: 'Blocks' },
  { name: 'AI & Robotics', icon: 'Blocks' },

  { name: 'Sustainability', icon: 'Blocks' },
  { name: 'Green Energy', icon: 'Blocks' },
  { name: 'Eco-friendly Tech', icon: 'Blocks' },

  { name: 'Health & Wellness', icon: 'Blocks' },
  { name: 'Mental Health', icon: 'Blocks' },
  { name: 'Fitness', icon: 'Blocks' },
];

export async function seedCategories(prisma: PrismaClient, rounds: Prisma.RoundGetPayload<{}>[]) {
  console.log('Seeding categories...');

  if (rounds.length === 0) {
    throw new Error('No rounds found to assign categories!');
  }

  // Prepare category data with dynamic round assignments
  const categoriesWithRoundIds = categoriesData.map((category, index) => {
    const roundId = rounds[index % rounds.length].id;

    return {
      ...category,
      roundId,
    };
  });

  const { count } = await prisma.category.createMany({
    data: categoriesWithRoundIds,
    skipDuplicates: true,
  });

  console.log(`${count} categories seeded successfully!`);

  return prisma.category.findMany();
}
