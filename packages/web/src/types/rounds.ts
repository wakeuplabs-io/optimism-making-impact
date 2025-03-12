import { categorySchema } from '@/types/categories';
import { z } from 'zod';

export const roundSchema = z.object({
  id: z.number(),
  link1: z.string().nullish(),
  link2: z.string().nullish(),
  createdAt: z.string().datetime().nullish(),
  updatedAt: z.string().datetime().nullish(),
});
export type Round = z.infer<typeof roundSchema>;

export const completeRoundSchema = roundSchema.extend({
  categories: z.array(categorySchema),
});
export type CompleteRound = z.infer<typeof completeRoundSchema>;
