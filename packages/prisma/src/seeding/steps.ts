import { Category, Prisma, PrismaClient, StepType } from '@prisma/client';

const groups = [
  [
    { title: '(IN) Introduction', icon: 'Blocks', type: StepType.INFOGRAPHIC },
    {
      title: '(IT) Checklist',
      icon: 'Blocks',
      type: StepType.SMARTLIST,
      description: 'Check items to understand the concept',
    },
    { title: '(CA) Priority Cards', icon: 'Blocks', type: StepType.CARDGRID },
  ],
  [
    { title: '(CA) Visual Cards', icon: 'Blocks', type: StepType.CARDGRID },
    { title: '(IN) Overview', icon: 'Blocks', type: StepType.INFOGRAPHIC },
    {
      title: '(IT) Inventory',
      icon: 'Blocks',
      type: StepType.SMARTLIST,
      description: 'Add items to your inventory',
    },
  ],
  [
    {
      title: '(IT) Checkout Items',
      icon: 'Blocks',
      type: StepType.SMARTLIST,
      description: 'Check out items you have added',
    },
    { title: '(IN) Deep Dive', icon: 'Blocks', type: StepType.INFOGRAPHIC },
    { title: '(CA) Information Cards', icon: 'Blocks', type: StepType.CARDGRID },
  ],
];

export async function seedSteps(prisma: PrismaClient, categories: Category[]) {
  console.log('Seeding steps...');

  if (categories.length === 0) {
    throw new Error('No categories found to assign steps!');
  }

  const stepsToSeed: Prisma.StepCreateManyInput[] = [];

  const sortedCategories = categories.sort((a, b) => a.roundId - b.roundId);

  for (const [index, category] of sortedCategories.entries()) {
    const group = groups[index % groups.length];

    group.forEach((step) => {
      stepsToSeed.push({
        title: step.title,
        icon: step.icon,
        type: step.type,
        categoryId: category.id, // Assign categoryId correctly
        smartListFilterId: null,
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
