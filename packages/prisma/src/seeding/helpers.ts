import { Prisma } from '@prisma/client';

export const COLORS_OPTIONS = Object.values(Prisma.Color);

export function selectTwoItems<T>(items: T[]): [T, T] {
  const uniqueItems = [...new Set(items)];
  if (uniqueItems.length < 2) throw new Error('Not enough unique items');

  const shuffled = uniqueItems.sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}
