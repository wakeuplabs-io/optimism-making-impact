import { CardStrength, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const strengthArray: CardStrength[] = ['LOW', 'MEDIUM', 'HIGH'];

async function seedRoundsAndCategories() {
  console.log('Seeding rounds and categories...');
  const round1 = await prisma.round.create({
    data: {
      name: 'Round 1',
      icon: 'round-icon-1.png',
      link1: 'https://www.wakeuplabs.io/',
      link2: 'https://www.wakeuplabs.io/',
    },
  });

  const round2 = await prisma.round.create({
    data: {
      name: 'Round 2',
      icon: 'round-icon-2.png',
      link1: 'https://www.wakeuplabs.io/',
      link2: 'https://www.wakeuplabs.io/',
    },
  });

  const round3 = await prisma.round.create({
    data: {
      name: 'Round 3',
      icon: 'round-icon-3.png',
      link1: 'https://www.wakeuplabs.io/',
      link2: 'https://www.wakeuplabs.io/',
    },
  });

  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Technology', icon: 'tech-icon.png', roundId: round1.id },
    }),
    prisma.category.create({
      data: { name: 'Science', icon: 'science-icon.png', roundId: round1.id },
    }),
    prisma.category.create({
      data: { name: 'Mathematics', icon: 'math-icon.png', roundId: round2.id },
    }),
    prisma.category.create({
      data: { name: 'Engineering', icon: 'engineering-icon.png', roundId: round2.id },
    }),
    prisma.category.create({
      data: { name: 'Arts', icon: 'arts-icon.png', roundId: round3.id },
    }),
    prisma.category.create({
      data: { name: 'History', icon: 'history-icon.png', roundId: round3.id },
    }),
  ]);
  console.log('Created rounds and categories.');
  return { round1, round2, round3, categories };
}

async function seedAttributes(categories) {
  console.log('Seeding attributes...');
  const attributes = await Promise.all([
    prisma.attribute.create({ data: { value: 'Innovative', categoryId: categories[0].id } }),
    prisma.attribute.create({ data: { value: 'Reliable', categoryId: categories[0].id } }),
    prisma.attribute.create({ data: { value: 'Empirical', categoryId: categories[1].id } }),
    prisma.attribute.create({ data: { value: 'Analytical', categoryId: categories[2].id } }),
    prisma.attribute.create({ data: { value: 'Creative', categoryId: categories[4].id } }),
    prisma.attribute.create({ data: { value: 'Detailed', categoryId: categories[5].id } }),
  ]);
  console.log(`Created ${attributes.length} attributes.`);
  return attributes;
}

async function seedKeywords() {
  console.log('Seeding keywords...');
  const keywords = await Promise.all([
    prisma.keyword.create({ data: { value: 'Innovation' } }),
    prisma.keyword.create({ data: { value: 'Creativity' } }),
    prisma.keyword.create({ data: { value: 'Discovery' } }),
    prisma.keyword.create({ data: { value: 'Reliability' } }),
    prisma.keyword.create({ data: { value: 'Analysis' } }),
  ]);
  console.log(`Created ${keywords.length} keywords.`);
  return keywords;
}

async function seedSteps(rounds) {
  console.log('Seeding steps...');

  const steps = await Promise.all([
    // Steps for Round 1
    prisma.step.create({
      data: {
        title: '(In) Introduction to Technology',
        icon: 'intro-tech.png',
        position: 0,
        type: 'INFOGRAPHY',
        roundId: rounds.round1.id,
      },
    }),
    prisma.step.create({
      data: { title: '(It) Advanced Technology', icon: 'advanced-tech.png', position: 1, type: 'ITEMS', roundId: rounds.round1.id },
    }),
    prisma.step.create({
      data: { title: '(C) Emerging Trends in Tech', icon: 'emerging-tech.png', position: 2, type: 'CARD', roundId: rounds.round1.id },
    }),

    // Steps for Round 2
    prisma.step.create({
      data: {
        title: '(In) Introduction to Mathematics',
        icon: 'intro-math.png',
        position: 0,
        type: 'INFOGRAPHY',
        roundId: rounds.round2.id,
      },
    }),
    prisma.step.create({
      data: { title: '(It) Algebra Basics', icon: 'algebra-basics.png', position: 1, type: 'ITEMS', roundId: rounds.round2.id },
    }),
    prisma.step.create({
      data: { title: '(C) Geometry Essentials', icon: 'geometry-essentials.png', position: 2, type: 'CARD', roundId: rounds.round2.id },
    }),

    // Steps for Round 3
    prisma.step.create({
      data: { title: '(In) Introduction to Arts', icon: 'intro-arts.png', position: 0, type: 'INFOGRAPHY', roundId: rounds.round3.id },
    }),
    prisma.step.create({
      data: { title: '(It) Modern Art Movements', icon: 'modern-art.png', position: 1, type: 'ITEMS', roundId: rounds.round3.id },
    }),
    prisma.step.create({
      data: { title: '(C) Classical Art Techniques', icon: 'classical-art.png', position: 2, type: 'CARD', roundId: rounds.round3.id },
    }),
  ]);

  console.log(`Created ${steps.length} steps.`);
  return steps;
}

async function seedInfographies(steps) {
  console.log('Seeding infographies...');

  const infographies = await Promise.all([
    prisma.infography.create({
      data: {
        markdown:
          'Incididunt est fugiat commodo nostrud enim fugiat duis laborum veniam eiusmod velit quis. Ex non sunt est deserunt. Ipsum magna pariatur officia do est sit fugiat pariatur adipisicing adipisicing labore nostrud sint. Quis laboris cupidatat Lorem nostrud minim reprehenderit nisi cillum pariatur exercitation ut excepteur reprehenderit. Cillum Lorem id commodo occaecat incididunt tempor proident labore consequat magna in. Proident dolor sit laborum aute nulla cupidatat nulla. Est velit quis consequat pariatur aliqua nisi deserunt cillum deserunt irure aliquip Lorem cillum dolore.',
        image: 'https://www.datocms-assets.com/132613/1724440968-creditgreenpeace-greatbearrainforest-spruceinterior-2.jpg?w=1200',
        position: 0,
        stepId: steps[0].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Commodo adipisicing id minim cupidatat id magna cupidatat laborum excepteur. Quis laborum consectetur ipsum magna enim in. Mollit consectetur culpa velit proident ipsum aliqua proident ut aliquip labore sint incididunt. Reprehenderit fugiat tempor nisi cillum excepteur id culpa Lorem aute anim cillum incididunt dolor nisi. Mollit non anim aliquip eiusmod culpa occaecat consequat commodo esse nostrud. Ad id cillum in exercitation eiusmod esse eu occaecat.',
        image: 'https://www.datocms-assets.com/132613/1724440968-creditgreenpeace-greatbearrainforest-spruceinterior-2.jpg?w=1200',
        position: 1,
        stepId: steps[0].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Non ea reprehenderit fugiat ut mollit aute eu excepteur fugiat Lorem officia laborum. Nulla in do nostrud sint et ea magna qui do culpa. Lorem qui sunt eiusmod dolore aute. Culpa ad pariatur fugiat cillum est. Qui laborum irure veniam velit do laboris. Esse id sunt ad excepteur fugiat sint eiusmod eu occaecat ullamco sunt deserunt cillum. Amet sint eiusmod elit magna ad sint.',
        image: 'https://www.datocms-assets.com/132613/1724440968-creditgreenpeace-greatbearrainforest-spruceinterior-2.jpg?w=1200',
        position: 0,
        stepId: steps[3].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Do duis sit officia ea labore mollit minim sint occaecat tempor non. Occaecat voluptate cillum deserunt est ad dolor. Laborum ea commodo ex sint excepteur commodo eu incididunt id exercitation qui nulla qui velit. Incididunt dolor adipisicing tempor consequat tempor aliquip ex. Elit et velit aliqua laborum esse. Duis adipisicing laboris eu aute ex sunt occaecat et quis adipisicing cillum eu pariatur.',
        image: 'https://example.com/intro-math-infography-2.png',
        position: 1,
        stepId: steps[3].id,
      },
    }),
  ]);

  console.log(`Created ${infographies.length} infographies.`);
  return infographies;
}

async function seedCardsForCardSteps() {
  console.log('Populating CARD steps with cards...');

  const cardSteps = await prisma.step.findMany({ where: { type: 'CARD' } });
  const attributes = await prisma.attribute.findMany();
  const keywords = await prisma.keyword.findMany();

  if (keywords.length < 2) {
    console.error('Not enough keywords to assign to cards.');
    return;
  }

  for (const step of cardSteps) {
    const cards = await Promise.all(
      Array.from({ length: 6 }, (_, i) => {
        const keywordSet = keywords.slice(i % keywords.length, (i % keywords.length) + 2);
        return prisma.card.create({
          data: {
            title: `Card ${i + 1} - ${step.title}`,
            markdown: `Markdown content for Card ${i + 1} in step ${step.title}`,
            strength: strengthArray[i % strengthArray.length],
            position: i,
            stepId: step.id,
            attributeId: attributes[i % attributes.length].id,
            keywords: {
              connect: keywordSet.map((keyword) => ({ id: keyword.id })),
            },
          },
        });
      }),
    );

    console.log(`Created ${cards.length} cards for step: ${step.title}`);
  }

  console.log('Completed populating CARD steps.');
}

async function main() {
  console.log('Seeding database...');
  const rounds = await seedRoundsAndCategories();
  await seedAttributes(rounds.categories);
  await seedKeywords();
  const steps = await seedSteps(rounds);
  await seedInfographies(steps);
  await seedCardsForCardSteps();
  console.log('Seeding complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
