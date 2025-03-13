import { categorySchema } from './category';
import { stepTypeSchema } from './enums';
import { keywordSchema } from './keywords';
import { z } from 'zod';

// Basic
export const baseStepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string(),
  position: z.number(),
  type: stepTypeSchema,
  categoryId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type BaseStep = z.infer<typeof baseStepSchema>;

export const completeBaseStepSchema = baseStepSchema.extend({
  category: categorySchema,
  keywords: z.array(keywordSchema),
  smartListFilterId: z.number().nullable(),
});
export type CompleteBaseStep = z.infer<typeof completeBaseStepSchema>;
