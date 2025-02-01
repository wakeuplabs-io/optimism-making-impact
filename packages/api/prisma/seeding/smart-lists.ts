import { PrismaClient } from '@prisma/client';

const smartLists = [
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

export async function seedSmartLists(prisma: PrismaClient) {
  console.log('Seeding smart lists...');

  const { count } = await prisma.smartList.createMany({
    data: smartLists,
    skipDuplicates: true,
  });

  console.log(`${count} smart lists seeded successfully!`);

  // Return created SmartLists for confirmation
  return prisma.smartList.findMany();
}
