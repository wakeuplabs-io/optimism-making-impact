import { Category, Prisma, PrismaClient, StepType } from '@prisma/client';

// Hardcoded steps data

const groups = [
  [
    { title: '(IN) Introduction', icon: 'https://www.example.com/step1-icon', type: StepType.INFOGRAPHY },
    {
      title: '(IT) Checklist',
      icon: 'https://www.example.com/step2-icon',
      type: StepType.ITEMS,
      description: 'Check items to understand the concept',
    },
    { title: '(CA) Priority Cards', icon: 'https://www.example.com/step3-icon', type: StepType.CARD },
  ],
  [
    { title: '(CA) Visual Cards', icon: 'https://www.example.com/step6-icon', type: StepType.CARD },
    { title: '(IN) Overview', icon: 'https://www.example.com/step4-icon', type: StepType.INFOGRAPHY },
    {
      title: '(IT) Inventory',
      icon: 'https://www.example.com/step5-icon',
      type: StepType.ITEMS,
      description: 'Add items to your inventory',
    },
  ],
  [
    {
      title: '(IT) Checkout Items',
      icon: 'https://www.example.com/step8-icon',
      type: StepType.ITEMS,
      description: 'Check out items you have added',
    },
    { title: '(IN) Deep Dive', icon: 'https://www.example.com/step7-icon', type: StepType.INFOGRAPHY },
    { title: '(CA) Information Cards', icon: 'https://www.example.com/step9-icon', type: StepType.CARD },
  ],
];

// Helper function to shuffle an array

export async function seedSteps(prisma: PrismaClient, categories: Category[]) {
  console.log('Seeding steps...');

  if (categories.length === 0) {
    throw new Error('No categories found to assign steps!');
  }

  const stepsToSeed: Prisma.StepCreateManyInput[] = [];

  const sortedCategories = categories.sort((a, b) => a.roundId - b.roundId);

  for (const [index, category] of sortedCategories.entries()) {
    const group = groups[index % groups.length]; // Cycle through the hardcoded groups

    group.forEach((step, position) => {
      stepsToSeed.push({
        title: step.title,
        icon: step.icon,
        type: step.type,
        categoryId: category.id, // Assign categoryId correctly
        position, // Maintain order
        smartListId: null,
        description: step.description ?? '',
      });
    });
  }
  const { count } = await prisma.step.createMany({
    data: stepsToSeed,
    skipDuplicates: true,
  });

  console.log(`${count} steps seeded successfully!`);

  return prisma.step.findMany();
}
