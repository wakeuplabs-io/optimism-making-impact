import { prisma } from '@/lib/prisma/instance.js';
import { CompleteRound } from '@/types/entities/round.js';

/**
 * Fetches a complete round from the database, including all associated categories, steps, smart lists, infographies, items, cards, attributes, and keywords.
 * @param {number} roundId - The ID of the round to fetch.
 * @returns {Promise<CompleteRound>} A promise that resolves to the fetched round.
 * @throws {Prisma.PrismaClientKnownRequestError} If the round does not exist.
 */
export function getCompleteRound(roundId: number): Promise<CompleteRound> {
  return prisma.round.findUniqueOrThrow({
    where: { id: roundId },
    include: {
      categories: { include: { attributes: true } },
      steps: {
        include: {
          smartList: { include: { attributes: true } },
          infographies: true,
          items: { include: { attribute: true } },
          cards: { include: { attribute: true, keywords: true } },
        },
      },
    },
  });
}

/**
 * Fetches the most recent round (including categories, steps, attributes, smart lists, infographies, items, and cards).
 * @returns The most recent round.
 * @throws If no round exists.
 */
export async function fetchLastCompleteRound(): Promise<CompleteRound> {
  return prisma.round.findFirstOrThrow({
    orderBy: { id: 'desc' },
    include: {
      categories: { include: { attributes: true } },
      steps: {
        include: {
          smartList: { include: { attributes: true } },
          infographies: true,
          items: { include: { attribute: true } },
          cards: { include: { attribute: true, keywords: true } },
        },
      },
    },
  });
}
