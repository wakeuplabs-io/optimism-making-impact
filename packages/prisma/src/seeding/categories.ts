import { PrismaClient, Prisma } from '@prisma/client';

const categoriesData = [
  { name: 'Technology', icon: 'blocks' },
  { name: 'Innovation', icon: 'blocks' },
  { name: 'AI & Robotics', icon: 'blocks' },

  { name: 'Sustainability', icon: 'blocks' },
  { name: 'Green Energy', icon: 'blocks' },
  { name: 'Eco-friendly Tech', icon: 'blocks' },

  { name: 'Health & Wellness', icon: 'blocks' },
  { name: 'Mental Health', icon: 'blocks' },
  { name: 'Fitness', icon: 'blocks' },
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
