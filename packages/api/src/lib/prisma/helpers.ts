import { prisma } from '@/lib/prisma/instance.js';
import { CompleteRound } from '@/types/entities/round.js';

/**
 * Fetches a complete round from the database, including all associated categories, steps, smart lists, infographics, items, cards, attributes, and keywords.
 * @param {number} roundId - The ID of the round to fetch.
 * @returns {Promise<CompleteRound>} A promise that resolves to the fetched round.
 * @throws {Prisma.PrismaClientKnownRequestError} If the round does not exist.
 */
export function getCompleteRound(roundId: number): Promise<CompleteRound> {
  return prisma.round.findUniqueOrThrow({
    where: { id: roundId },
    include: {
      categories: {
        include: {
          attributes: true,
          steps: {
            orderBy: { position: 'asc' },
            include: {
              infographies: { orderBy: { position: 'asc' } },
              items: { include: { attribute: true }, orderBy: { position: 'asc' } },
              cards: { include: { attribute: true, keywords: true }, orderBy: { position: 'asc' } },
              smartList: { include: { attributes: true } },
            },
          },
        },
      },
    },
  });
}

/**
 * Fetches the most recent round (including categories, steps, attributes, smart lists, infographics, items, and cards).
 * @returns The most recent round.
 * @throws If no round exists.
 */
export async function getLastCompleteRound(): Promise<CompleteRound> {
  const lastRoundId = await prisma.round.findFirstOrThrow({ orderBy: { id: 'desc' }, select: { id: true } });

  return getCompleteRound(lastRoundId.id);
}
