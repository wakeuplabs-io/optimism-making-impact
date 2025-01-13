import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const start = performance.now();
  console.log('Seeding database...');

  // Create Rounds
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
  console.log(`Created 3 rounds`);

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Technology',
        icon: 'tech-icon.png',
        roundId: round1.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Science',
        icon: 'science-icon.png',
        roundId: round1.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Mathematics',
        icon: 'math-icon.png',
        roundId: round2.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Engineering',
        icon: 'engineering-icon.png',
        roundId: round2.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Arts',
        icon: 'arts-icon.png',
        roundId: round3.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'History',
        icon: 'history-icon.png',
        roundId: round3.id,
      },
    }),
  ]);
  console.log(`Created ${categories.length} categories`);

  // Create Attributes
  const attributes = await Promise.all([
    prisma.attribute.create({
      data: {
        value: 'Innovative',
        categoryId: categories[0].id,
      },
    }),
    prisma.attribute.create({
      data: {
        value: 'Reliable',
        categoryId: categories[0].id,
      },
    }),
    prisma.attribute.create({
      data: {
        value: 'Empirical',
        categoryId: categories[1].id,
      },
    }),
    prisma.attribute.create({
      data: {
        value: 'Analytical',
        categoryId: categories[2].id,
      },
    }),
    prisma.attribute.create({
      data: {
        value: 'Creative',
        categoryId: categories[4].id,
      },
    }),
    prisma.attribute.create({
      data: {
        value: 'Detailed',
        categoryId: categories[5].id,
      },
    }),
  ]);
  console.log(`Created ${attributes.length} attributes`);

  // Create Steps
  const steps = await Promise.all([
    prisma.step.create({
      data: {
        title: 'Introduction to Technology',
        icon: 'intro-tech.png',
        position: 0,
        type: 'INFOGRAPHY',
        roundId: round1.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Advanced Technology',
        icon: 'advanced-tech.png',
        position: 1,
        type: 'ITEMS',
        roundId: round1.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Emerging Trends in Tech',
        icon: 'emerging-tech.png',
        position: 2,
        type: 'CARD',
        roundId: round1.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Future of Technology',
        icon: 'future-tech.png',
        position: 3,
        type: 'INFOGRAPHY',
        roundId: round1.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Introduction to Mathematics',
        icon: 'intro-math.png',
        position: 0,
        type: 'INFOGRAPHY',
        roundId: round2.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Algebra Basics',
        icon: 'algebra-basics.png',
        position: 1,
        type: 'ITEMS',
        roundId: round2.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Geometry Essentials',
        icon: 'geometry-essentials.png',
        position: 2,
        type: 'CARD',
        roundId: round2.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Advanced Calculus',
        icon: 'advanced-calculus.png',
        position: 3,
        type: 'INFOGRAPHY',
        roundId: round2.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Introduction to Arts',
        icon: 'intro-arts.png',
        position: 0,
        type: 'INFOGRAPHY',
        roundId: round3.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Modern Art Movements',
        icon: 'modern-art.png',
        position: 1,
        type: 'ITEMS',
        roundId: round3.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Classical Art Techniques',
        icon: 'classical-art.png',
        position: 2,
        type: 'CARD',
        roundId: round3.id,
      },
    }),
    prisma.step.create({
      data: {
        title: 'Digital Art Revolution',
        icon: 'digital-art.png',
        position: 3,
        type: 'INFOGRAPHY',
        roundId: round3.id,
      },
    }),
  ]);
  console.log(`Created ${steps.length} steps`);

  // Create Infographies
  const infographies = await Promise.all([
    prisma.infography.create({
      data: {
        markdown: 'Understanding the basics of technology through visuals.',
        image: 'tech-basics.png',
        position: 1, // TODO: make it zero-based
        stepId: steps[0].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown: 'Explore advanced concepts in science.',
        image: 'science-advanced.png',
        position: 2, // TODO: make it zero-based
        stepId: steps[0].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown: 'Principles of mechanical engineering.',
        image: 'mechanical.png',
        position: 1, // TODO: make it zero-based
        stepId: steps[11].id,
      },
    }),
  ]);
  console.log(`Created ${infographies.length} infographies`);

  // Create Items
  const items = await Promise.all([
    prisma.item.create({
      data: {
        markdown: 'Core principles of physics.',
        position: 1, // TODO: make it zero-based
        stepId: steps[1].id,
        attributeId: attributes[2].id,
      },
    }),
    prisma.item.create({
      data: {
        markdown: 'Chemistry in everyday life.',
        position: 2, // TODO: make it zero-based
        stepId: steps[1].id,
        attributeId: attributes[2].id,
      },
    }),
    prisma.item.create({
      data: {
        markdown: 'Renaissance art techniques.',
        position: 1, // TODO: make it zero-based
        stepId: steps[9].id,
        attributeId: attributes[4].id,
      },
    }),
  ]);
  console.log(`Created ${items.length} items`);

  // Create Cards
  const cards = await Promise.all([
    prisma.card.create({
      data: {
        title: 'Pythagorean Theorem',
        markdown: 'A fundamental theorem in mathematics.',
        strength: 'HIGH',
        position: 1, // TODO: make it zero-based
        stepId: steps[2].id,
        attributeId: attributes[3].id,
      },
    }),
    prisma.card.create({
      data: {
        title: 'Law of Gravity',
        markdown: 'An essential concept in physics.',
        strength: 'MEDIUM',
        position: 2, // TODO: make it zero-based
        stepId: steps[2].id,
        attributeId: attributes[2].id,
      },
    }),
    prisma.card.create({
      data: {
        title: "Da Vinci's Perspective",
        markdown: "Insights into Da Vinci's techniques.",
        strength: 'LOW',
        position: 1, // TODO: make it zero-based
        stepId: steps[10].id,
        attributeId: attributes[4].id,
      },
    }),
  ]);
  console.log(`Created ${cards.length} cards`);

  // Create Keywords and CardKeywords
  const keywords = await Promise.all([
    prisma.keyword.create({
      data: {
        value: 'Innovation',
      },
    }),
    prisma.keyword.create({
      data: {
        value: 'Discovery',
      },
    }),
    prisma.keyword.create({
      data: {
        value: 'Creativity',
      },
    }),
  ]);
  console.log(`Created ${keywords.length} keywords`);

  const cardKeywords = await Promise.all([
    prisma.cardKeyword.create({
      data: {
        cardId: cards[0].id,
        keywordId: keywords[0].id,
      },
    }),
    prisma.cardKeyword.create({
      data: {
        cardId: cards[1].id,
        keywordId: keywords[1].id,
      },
    }),
    prisma.cardKeyword.create({
      data: {
        cardId: cards[2].id,
        keywordId: keywords[2].id,
      },
    }),
  ]);
  console.log(`Created ${cardKeywords.length} cardKeywords`);

  const end = performance.now();
  console.log(`Seeding complete in ${Math.round(end - start)} ms`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
