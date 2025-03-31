import { selectTwoItems } from './helpers';
import { PrismaClient, Prisma } from '@prisma/client';

const cardsData = [
  {
    title: 'Understanding Blockchain',
    markdown:
      'Blockchain is a decentralized technology that is distributed across many computers. It allows secure, transparent transactions without the need for a trusted third party.',
    strength: Prisma.CardStrength.MEDIUM,
  },
  {
    title: 'DeFi Explained',
    markdown:
      'DeFi (Decentralized Finance) is a movement that aims to create open-source financial services on blockchain networks, eliminating intermediaries like banks.',
    strength: Prisma.CardStrength.HIGH,
  },
  {
    title: 'Introduction to Smart Contracts',
    markdown:
      'Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They automate transactions and agreements on the blockchain.',
    strength: Prisma.CardStrength.LOW,
  },
  {
    title: 'NFT Marketplaces',
    markdown:
      'NFTs (Non-Fungible Tokens) represent ownership of unique items. They can be bought and sold on specialized online marketplaces, opening new possibilities for digital art.',
    strength: Prisma.CardStrength.MEDIUM,
  },
  {
    title: 'Ethereum and Its Ecosystem',
    markdown:
      'Ethereum is a decentralized platform that allows developers to build and deploy decentralized applications (dApps) using smart contracts.',
    strength: Prisma.CardStrength.HIGH,
  },
];

export const keywords = [
  'Innovation',
  'Technology',
  'Efficiency',
  'Sustainability',
  'Productivity',
  'Collaboration',
  'Optimization',
  'Strategy',
  'Scalability',
  'Automation',
  'Data Analysis',
  'Machine Learning',
  'Blockchain',
  'Cloud Computing',
];

export async function seedCards(prisma: PrismaClient, steps: Array<Prisma.StepGetPayload<{}>>) {
  console.log('Seeding cards...');

  const createdCards: Array<Prisma.CardGetPayload<{}>> = [];

  for (const step of steps) {
    if (step.type !== Prisma.StepType.CARDGRID) continue;

    for (let i = 0; i < 5; i++) {
      const thisCardKeywords = selectTwoItems(keywords);

      const card = await prisma.card.create({
        data: {
          title: cardsData[i].title,
          markdown: cardsData[i].markdown,
          strength: cardsData[i].strength,
          stepId: step.id,
          keywords: {
            connectOrCreate: thisCardKeywords.map((keyword) => ({
              where: { value_stepId: { value: keyword, stepId: step.id } },
              create: { value: keyword, stepId: step.id },
            })),
          },
        },
      });

      createdCards.push(card);
    }
  }

  console.log('Cards seeded successfully!');
  return createdCards;
}
