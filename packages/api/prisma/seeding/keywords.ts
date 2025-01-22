import { PrismaClient } from '@prisma/client';

const keywords = [
  { value: 'Innovation' },
  { value: 'Technology' },
  { value: 'Efficiency' },
  { value: 'Sustainability' },
  { value: 'Productivity' },
  { value: 'Collaboration' },
  { value: 'Optimization' },
  { value: 'Strategy' },
  { value: 'Scalability' },
  { value: 'Automation' },
  { value: 'Data Analysis' },
  { value: 'Machine Learning' },
  { value: 'Blockchain' },
  { value: 'Cloud Computing' },
  { value: 'Security' },
  { value: 'Integration' },
  { value: 'User Experience' },
  { value: 'Performance' },
  { value: 'Agility' },
  { value: 'Reliability' },
  { value: 'Accessibility' },
  { value: 'Customization' },
  { value: 'Resilience' },
  { value: 'Innovation' },
  { value: 'Design Thinking' },
  { value: 'Cost Reduction' },
  { value: 'Digital Transformation' },
  { value: 'IoT' },
  { value: 'Big Data' },
  { value: 'DevOps' },
];

export async function seedKeywords(prisma: PrismaClient) {
  console.log('Seeding keywords...');

  const { count } = await prisma.keyword.createMany({
    data: keywords,
    skipDuplicates: true,
  });

  console.log(`${count} keywords seeded successfully!`);

  return prisma.keyword.findMany();
}
