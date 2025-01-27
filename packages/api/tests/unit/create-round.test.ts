import { PrismaClient } from '@prisma/client';
import { expect, test } from 'vitest';

const prisma = new PrismaClient();

test('Seeded rounds should be 3', async () => {
  const rounds = await prisma.round.findMany();

  expect(rounds.length).toBe(3);
});
