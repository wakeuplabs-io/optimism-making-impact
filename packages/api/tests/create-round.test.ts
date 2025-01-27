import { prisma } from '../src/lib/prisma/instance.js';
import { expect, test } from 'vitest';

test('Seeded rounds should be 3', async () => {
  const rounds = await prisma.round.findMany();

  expect(rounds.length).toBe(3);
});
