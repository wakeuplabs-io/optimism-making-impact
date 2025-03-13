import { stepTypeSchema } from './enums';
import { z } from 'zod';

export const baseStepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  icon: z.string(),
  type: stepTypeSchema,
  categoryId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type BaseStep = z.infer<typeof baseStepSchema>;

export const infographicStepSchema = baseStepSchema.extend({
  type: z.literal('INFOGRAPHIC'),
});
export type InfographicStep = z.infer<typeof infographicStepSchema>;

export const smartListStepSchema = baseStepSchema.extend({
  type: z.literal('SMARTLIST'),
});
export type SmartListStep = z.infer<typeof smartListStepSchema>;

export const cardGridStepSchema = baseStepSchema.extend({
  type: z.literal('CARDGRID'),
});
export type CardGridStep = z.infer<typeof cardGridStepSchema>;
