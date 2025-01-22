import { PrismaClient, Round, Step, StepType } from '@prisma/client';

// Hardcoded steps data
const stepsData = [
  { title: '(IN) Introduction', icon: 'https://www.example.com/step1-icon', type: StepType.INFOGRAPHY },
  { title: '(IT) Checklist', icon: 'https://www.example.com/step2-icon', type: StepType.ITEMS },
  { title: '(CA) Priority Cards', icon: 'https://www.example.com/step3-icon', type: StepType.CARD },

  { title: '(IN) Overview', icon: 'https://www.example.com/step4-icon', type: StepType.INFOGRAPHY },
  { title: '(IT) Inventory', icon: 'https://www.example.com/step5-icon', type: StepType.ITEMS },
  { title: '(CA) Visual Cards', icon: 'https://www.example.com/step6-icon', type: StepType.CARD },

  { title: '(IN) Deep Dive', icon: 'https://www.example.com/step7-icon', type: StepType.INFOGRAPHY },
  { title: '(IT) Checkout Items', icon: 'https://www.example.com/step8-icon', type: StepType.ITEMS },
  { title: '(CA) Information Cards', icon: 'https://www.example.com/step9-icon', type: StepType.CARD },
];

// Pre-filtered arrays for each type
const infographySteps = stepsData.filter((step) => step.type === StepType.INFOGRAPHY);
const itemsSteps = stepsData.filter((step) => step.type === StepType.ITEMS);
const cardSteps = stepsData.filter((step) => step.type === StepType.CARD);

export async function seedSteps(prisma: PrismaClient, rounds: Round[]) {
  console.log('Seeding steps...');

  if (rounds.length === 0) {
    throw new Error('No rounds found to assign steps!');
  }

  const stepsToSeed: Omit<Step, 'id' | 'createdAt' | 'updatedAt'>[] = [];

  // Initialize indexes to cycle through steps
  let infographyIndex = 0;
  let itemsIndex = 0;
  let cardIndex = 0;

  for (const round of rounds) {
    // Add one step of each type for the round
    const requiredSteps = [
      infographySteps[infographyIndex % infographySteps.length],
      itemsSteps[itemsIndex % itemsSteps.length],
      cardSteps[cardIndex % cardSteps.length],
    ];

    requiredSteps.forEach((step, index) => {
      stepsToSeed.push({
        title: `${step.title}`,
        icon: step.icon,
        type: step.type,
        roundId: round.id,
        position: index, // Use index for ordering within the round
        smartListId: null,
      });
    });

    // Increment the indexes to cycle through available steps
    infographyIndex++;
    itemsIndex++;
    cardIndex++;
  }

  const { count } = await prisma.step.createMany({
    data: stepsToSeed,
    skipDuplicates: true,
  });

  console.log(`${count} steps seeded successfully!`);

  return prisma.step.findMany();
}
