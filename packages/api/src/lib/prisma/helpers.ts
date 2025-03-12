import { prisma } from '@/lib/prisma/instance.js';
import { CompleteRound } from '@/types/entities/round.js';

/**
 * Fetches a complete round from the database, including all associated categories, steps, smart lists, infographics, items, cards, attributes, and keywords, if exists.
 * @param {number} roundId - The ID of the round to fetch.
 * @returns {Promise<CompleteRound>} A promise that resolves to the fetched round.
 * @throws {Prisma.PrismaClientKnownRequestError} If the round does not exist.
 */
export function getCompleteRound(roundId: number): Promise<CompleteRound | null> {
  return prisma.round.findUnique({
    where: { id: roundId },
    include: {
      categories: {
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
        include: {
          attributes: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
          steps: {
            orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
            include: {
              infographics: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
              items: {
                include: { attribute: true },
                orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
              },
              cards: {
                include: {
                  attribute: true,
                  keywords: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
                },
                orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
              },
              smartListFilter: {
                include: {
                  attributes: { orderBy: [{ createdAt: 'asc' }, { id: 'asc' }] },
                },
              },
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
export async function getLastCompleteRound(): Promise<CompleteRound | null> {
  const lastRoundId = await prisma.round.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true },
  });

  if (!lastRoundId) return null;

  return getCompleteRound(lastRoundId.id);
}
