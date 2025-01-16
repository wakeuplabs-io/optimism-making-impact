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
        markdown:
          'Incididunt est fugiat commodo nostrud enim fugiat duis laborum veniam eiusmod velit quis. Ex non sunt est deserunt. Ipsum magna pariatur officia do est sit fugiat pariatur adipisicing adipisicing labore nostrud sint. Quis laboris cupidatat Lorem nostrud minim reprehenderit nisi cillum pariatur exercitation ut excepteur reprehenderit. Cillum Lorem id commodo occaecat incididunt tempor proident labore consequat magna in. Proident dolor sit laborum aute nulla cupidatat nulla. Est velit quis consequat pariatur aliqua nisi deserunt cillum deserunt irure aliquip Lorem cillum dolore.',
        image: 'tech-basics.png',
        position: 0,
        stepId: steps[0].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Commodo adipisicing id minim cupidatat id magna cupidatat laborum excepteur. Quis laborum consectetur ipsum magna enim in. Mollit consectetur culpa velit proident ipsum aliqua proident ut aliquip labore sint incididunt. Reprehenderit fugiat tempor nisi cillum excepteur id culpa Lorem aute anim cillum incididunt dolor nisi. Mollit non anim aliquip eiusmod culpa occaecat consequat commodo esse nostrud. Ad id cillum in exercitation eiusmod esse eu occaecat.',
        image: 'science-advanced.png',
        position: 1,
        stepId: steps[0].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Non ea reprehenderit fugiat ut mollit aute eu excepteur fugiat Lorem officia laborum. Nulla in do nostrud sint et ea magna qui do culpa. Lorem qui sunt eiusmod dolore aute. Culpa ad pariatur fugiat cillum est. Qui laborum irure veniam velit do laboris. Esse id sunt ad excepteur fugiat sint eiusmod eu occaecat ullamco sunt deserunt cillum. Amet sint eiusmod elit magna ad sint.',
        image: 'mechanical.png',
        position: 0,
        stepId: steps[11].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Nostrud aute velit ipsum ullamco ut laborum Lorem. Cupidatat velit mollit occaecat pariatur id sunt eiusmod non ullamco nulla eiusmod exercitation. Fugiat aliqua adipisicing commodo anim aute veniam excepteur sint duis id consectetur.',
        image: 'digital-rise.png',
        position: 1,
        stepId: steps[11].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Esse mollit esse duis nulla dolore labore incididunt non. Incididunt cillum ullamco exercitation minim laborum. Qui in dolor consequat nostrud. Quis ut enim magna eiusmod irure deserunt duis fugiat voluptate exercitation exercitation elit cillum mollit. Minim excepteur irure aliqua excepteur sit proident ex labore do laboris esse mollit culpa.',
        image: 'creativity-tech.png',
        position: 2,
        stepId: steps[11].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Quis duis eu nulla velit. Laborum consectetur excepteur in cupidatat. Id duis tempor voluptate esse mollit amet amet eu voluptate dolor commodo. Elit minim consectetur ex aliquip cillum minim anim. Dolor esse ad exercitation do velit minim ullamco consequat aliqua duis occaecat. Ut pariatur consequat sint reprehenderit adipisicing dolor dolor ut non consequat est dolore.',
        image: 'art-ai.png',
        position: 3,
        stepId: steps[11].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Sunt enim anim quis laborum quis minim in laborum dolore. Ea exercitation eiusmod commodo excepteur sit proident ipsum ut tempor anim reprehenderit exercitation amet consequat. Pariatur ut elit fugiat excepteur aute proident anim eiusmod elit amet. Quis ex nulla aliqua et dolore velit magna nulla enim sit aute ipsum.',
        image: 'art-ai.png',
        position: 4,
        stepId: steps[11].id,
      },
    }),
    prisma.infography.create({
      data: {
        markdown:
          'Irure cillum velit elit pariatur est tempor laborum cillum ullamco ex ipsum. Tempor cupidatat ad ipsum aute laboris culpa velit ad laborum mollit et culpa cupidatat. Amet aute voluptate fugiat culpa minim occaecat do deserunt ea ullamco cupidatat amet. Do irure nisi commodo excepteur. Dolor anim aliquip duis consequat laboris.',
        image: 'art-ai.png',
        position: 5,
        stepId: steps[11].id,
      },
    }),
  ]);
  console.log(`Created ${infographies.length} infographies`);

  // Create Items
  const items = await Promise.all([
    prisma.item.create({
      data: {
        markdown:
          'Elit commodo cillum enim labore et incididunt sit aute deserunt dolore sunt dolor ex. Sunt nulla aute ipsum et cillum ex non enim. Amet deserunt excepteur sunt ipsum excepteur. Laborum exercitation voluptate reprehenderit consectetur. Aliqua cupidatat ipsum dolor non ex. In pariatur tempor minim tempor. Aute duis eiusmod ea excepteur esse quis.',
        position: 0,
        stepId: steps[1].id,
        attributeId: attributes[2].id,
      },
    }),
    prisma.item.create({
      data: {
        markdown:
          'Nulla nulla aliqua nostrud et amet. Commodo adipisicing anim incididunt cillum veniam aliquip cillum. Ex eu excepteur in minim culpa sit id commodo. Proident cillum dolor nulla eu esse ipsum laborum eiusmod pariatur pariatur nisi incididunt. Mollit culpa deserunt incididunt consectetur ea sint ea ad aliqua anim cillum eu pariatur. Adipisicing quis exercitation duis ea amet duis.',
        position: 1,
        stepId: steps[1].id,
        attributeId: attributes[2].id,
      },
    }),
    prisma.item.create({
      data: {
        markdown:
          'Adipisicing sit exercitation et sit adipisicing in pariatur aliquip voluptate nostrud voluptate proident incididunt. Lorem aliquip amet eiusmod Lorem officia voluptate in nostrud eu minim adipisicing ut reprehenderit. Laborum aute in est culpa incididunt nostrud. Cupidatat commodo aliquip eu voluptate anim culpa amet dolor laboris. Enim ipsum proident amet labore culpa proident deserunt.',
        position: 0,
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
        markdown:
          'Ex aute consequat commodo in aliqua laboris officia adipisicing do est voluptate. Magna in labore do anim non consequat aliquip eu elit ipsum ea quis. Fugiat laboris anim pariatur non duis irure eiusmod in officia proident ad do. Sit deserunt cillum id amet fugiat culpa occaecat. Laborum commodo deserunt exercitation nisi commodo esse labore cupidatat aute commodo duis consequat. Nostrud consequat aliqua aliqua amet voluptate aliquip incididunt aliquip.',
        strength: 'HIGH',
        position: 0,
        stepId: steps[2].id,
        attributeId: attributes[3].id,
      },
    }),
    prisma.card.create({
      data: {
        title: 'Law of Gravity',
        markdown:
          'Id dolor ut cillum pariatur proident. Culpa irure eiusmod sunt in in minim et sint. Cillum Lorem ipsum dolore excepteur amet aute ut laboris. Eu enim ipsum laborum eiusmod amet. Laboris aute nulla veniam amet aute dolore laborum.',
        strength: 'MEDIUM',
        position: 1,
        stepId: steps[2].id,
        attributeId: attributes[2].id,
      },
    }),
    prisma.card.create({
      data: {
        title: "Da Vinci's Perspective",
        markdown:
          'Aute in labore aliqua non cupidatat irure sit pariatur. Ut ut velit commodo quis ea eiusmod commodo id non nostrud. Labore fugiat non esse Lorem esse. Consectetur sit consequat minim excepteur est incididunt laborum velit laboris. Tempor labore anim Lorem eiusmod dolor exercitation veniam. Ullamco ipsum laboris est occaecat commodo consectetur sint ullamco tempor mollit enim cupidatat dolor. Aute irure nostrud Lorem nulla deserunt ex minim amet amet.',
        strength: 'LOW',
        position: 0,
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
