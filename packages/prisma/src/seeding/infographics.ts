import { PrismaClient, Prisma } from '@prisma/client';

const infographicsData = [
  {
    markdown: 'This infographic illustrates the basic concepts of React components and their lifecycle.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'Here we explain the process of managing state in React using useState and useReducer hooks.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'This infographic provides a breakdown of the virtual DOM and how React updates the UI efficiently.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'An explanation of props and how data is passed between React components.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'A deep dive into state management libraries like Redux and their role in larger applications.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'Learn how to optimize React performance with techniques like memoization and lazy loading.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'This infographic covers testing strategies in React, including unit and integration tests.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: "A visual guide to understanding React's Context API for passing data deeply through components.",
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'This infographic shows the basics of routing in React using React Router for navigation.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
  {
    markdown: 'A guide to setting up React with TypeScript for type safety and enhanced development experience.',
    image: 'https://dummyimage.com/600x400/a5a5b5/ffffff.png',
  },
];

export async function seedInfographics(prisma: PrismaClient, steps: Prisma.StepGetPayload<{}>[]) {
  console.log('Seeding infographics...');

  const infographicsToCreate: Prisma.InfographicCreateInput[] = [];

  for (const step of steps) {
    if (step.type !== Prisma.StepType.INFOGRAPHIC) continue;

    for (let i = 0; i < 4; i++) {
      const infographicData = infographicsData[i % infographicsData.length];

      infographicsToCreate.push({
        markdown: infographicData.markdown,
        image: infographicData.image,
        stepId: step.id,
      });
    }
  }

  const { count } = await prisma.infographic.createMany({
    data: infographicsToCreate,
  });

  console.log(`${count} infographics seeded successfully!`);

  return prisma.infographic.findMany();
}
