import { stepSchema } from '@/types/steps';
import { attributeSchema } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  roundId: z.number(),
  createdAt: z.string().datetime().nullish(),
  updatedAt: z.string().datetime().nullish(),
});
export type Category = z.infer<typeof categorySchema>;

export const completeCategorySchema = categorySchema.extend({
  attributes: z.array(attributeSchema),
  steps: z.array(stepSchema),
});
export type CompleteCategory = z.infer<typeof completeCategorySchema>;
