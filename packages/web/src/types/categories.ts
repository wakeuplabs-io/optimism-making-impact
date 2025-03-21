import { stepSchema } from '@/types/steps';
import { attributeSchema, categorySchema } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const completeCategorySchema = categorySchema.extend({
  attributes: z.array(attributeSchema),
  steps: z.array(stepSchema),
});
export type CompleteCategory = z.infer<typeof completeCategorySchema>;
