import { categorySchema } from '@/types/categories';
import { stepSchema } from '@/types/steps';
import { z } from 'zod';

export const roundSchema = z.object({
  id: z.number(),
  link1: z.string().optional().default(''),
  link2: z.string().optional().default(''),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type Round = z.infer<typeof roundSchema>;

export const completeRoundSchema = roundSchema.extend({
  categories: z.array(categorySchema),
  steps: z.array(stepSchema),
});
export type CompleteRound = z.infer<typeof completeRoundSchema>;
