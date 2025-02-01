import { Card, CardStrength, Keyword, PrismaClient, Step, StepType } from '@prisma/client';

const cardsData = [
  {
    title: 'Understanding Blockchain',
    markdown:
      'Blockchain is a decentralized technology that is distributed across many computers. It allows secure, transparent transactions without the need for a trusted third party.',
    strength: CardStrength.MEDIUM,
  },
  {
    title: 'DeFi Explained',
    markdown:
      'DeFi (Decentralized Finance) is a movement that aims to create open-source financial services on blockchain networks, eliminating intermediaries like banks.',
    strength: CardStrength.HIGH,
  },
  {
    title: 'Introduction to Smart Contracts',
    markdown:
      'Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They automate transactions and agreements on the blockchain.',
    strength: CardStrength.LOW,
  },
  {
    title: 'NFT Marketplaces',
    markdown:
      'NFTs (Non-Fungible Tokens) represent ownership of unique items. They can be bought and sold on specialized online marketplaces, opening new possibilities for digital art.',
    strength: CardStrength.MEDIUM,
  },
  {
    title: 'Ethereum and Its Ecosystem',
    markdown:
      'Ethereum is a decentralized platform that allows developers to build and deploy decentralized applications (dApps) using smart contracts.',
    strength: CardStrength.HIGH,
  },
];

export async function seedCards(
  prisma: PrismaClient,
  steps: Array<Step>,
  keywords: Array<Keyword>, // Receive keywords as parameter
) {
  console.log('Seeding cards...');

  const createdCards: Array<Card> = [];

  // Keep track of the current keyword index
  let keywordIndex = 0;

  for (const step of steps) {
    if (step.type !== StepType.CARD) continue; // Only create cards for CARD type steps

    for (let i = 0; i < 5; i++) {
      // Assign sequential pairs of keywords to each card
      const selectedKeywords = keywords.slice(keywordIndex, keywordIndex + 2); // Get 2 keywords at a time

      const card = await prisma.card.create({
        data: {
          title: cardsData[i].title,
          markdown: cardsData[i].markdown,
          strength: cardsData[i].strength,
          position: i,
          stepId: step.id,
          keywords: {
            connect: selectedKeywords.map((keyword) => ({ id: keyword.id })), // Connect the selected keywords
          },
        },
      });

      createdCards.push(card);

      // Increment the keyword index by 2 to move to the next pair
      keywordIndex += 2;
    }
  }

  console.log('Cards seeded successfully!');
  return createdCards;
}
