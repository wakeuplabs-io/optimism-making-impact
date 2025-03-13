import { stepTypeSchema } from './enums';
import { z } from 'zod';

// Basic
export const baseStepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  icon: z.string(),
  position: z.number(),
  type: stepTypeSchema,
  categoryId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type BaseStep = z.infer<typeof baseStepSchema>;

export const completeBaseStepSchema = baseStepSchema.extend({
  category: z.any(),
  items: z.array(z.any()),
  keywords: z.array(z.any()),
  smartListFilterId: z.number().nullable(),
});
export type CompleteBaseStep = z.infer<typeof completeBaseStepSchema>;
