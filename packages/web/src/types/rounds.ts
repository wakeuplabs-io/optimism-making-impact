import { categorySchema, roundSchema } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const completeRoundSchema = roundSchema.extend({
  categories: z.array(categorySchema),
  status: z.enum(['PENDING', 'READY']).nullish(),
  createdAt: z.string().datetime().nullish(),
  updatedAt: z.string().datetime().nullish(),
});

export type CompleteRound = z.infer<typeof completeRoundSchema>;
