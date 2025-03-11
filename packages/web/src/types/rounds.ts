import { categorySchema } from '@/types/categories';
import { z } from 'zod';

export const roundSchema = z.object({
  id: z.number(),
  link1: z.string().optional(),
  link2: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type Round = z.infer<typeof roundSchema>;

export const completeRoundSchema = roundSchema.extend({
  categories: z.array(categorySchema),
});
export type CompleteRound = z.infer<typeof completeRoundSchema>;
