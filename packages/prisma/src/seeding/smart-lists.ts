import { PrismaClient } from '@prisma/client';

const smartListFilters = [
  { title: 'Tech Innovations' },
  { title: 'Sustainability Initiatives' },
  { title: 'Future Trends' },
  { title: 'Digital Transformation' },
  { title: 'AI and Automation' },
  { title: 'Data Analytics' },
  { title: 'Cloud Computing Strategies' },
  { title: 'Blockchain for Business' },
  { title: 'Productivity Hacks' },
  { title: 'Smart Cities' },
];

export async function seedSmartListFilters(prisma: PrismaClient) {
  console.log('Seeding smart lists filters...');

  const { count } = await prisma.smartListFilter.createMany({
    data: smartListFilters,
    skipDuplicates: true,
  });

  console.log(`${count} smart lists seeded successfully!`);

  return prisma.smartListFilter.findMany();
}
