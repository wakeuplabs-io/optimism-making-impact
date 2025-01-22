import { PrismaClient, Round } from '@prisma/client';

const categoriesData = [
  { name: 'Technology', icon: 'https://www.example.com/icon1' },
  { name: 'Innovation', icon: 'https://www.example.com/icon2' },
  { name: 'AI & Robotics', icon: 'https://www.example.com/icon3' },

  { name: 'Sustainability', icon: 'https://www.example.com/icon4' },
  { name: 'Green Energy', icon: 'https://www.example.com/icon5' },
  { name: 'Eco-friendly Tech', icon: 'https://www.example.com/icon6' },

  { name: 'Health & Wellness', icon: 'https://www.example.com/icon7' },
  { name: 'Mental Health', icon: 'https://www.example.com/icon8' },
  { name: 'Fitness', icon: 'https://www.example.com/icon9' },
];

export async function seedCategories(prisma: PrismaClient, rounds: Round[]) {
  console.log('Seeding categories...');

  if (rounds.length === 0) {
    throw new Error('No rounds found to assign categories!');
  }

  // Prepare category data with dynamic round assignments
  const categoriesWithRoundIds = categoriesData.map((category, index) => {
    const roundId = rounds[index % rounds.length].id; // Distribute categories across rounds

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
