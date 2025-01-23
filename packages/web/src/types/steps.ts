import { completeCardSchema } from '@/types/cards';
import { infographySchema } from '@/types/infographies';
import { completeItemSchema } from '@/types/items';
import { z } from 'zod';

// TODO: single source of truth
export const stepTypes = ['INFOGRAPHY', 'ITEMS', 'CARD'] as const;
export const stepTypeSchema = z.enum(stepTypes);
export type StepType = z.infer<typeof stepTypeSchema>;
export const enum StepTypes {
  INFOGRAPHY,
  ITEMS,
  CARD,
}

export const stepSchema = z.object({
  id: z.number(),
  title: z.string(),
  icon: z.string(),
  position: z.number(), // Zero-based
  type: stepTypeSchema,
  roundId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const stepArraySchema = z.array(stepSchema);
export type Step = z.infer<typeof stepSchema>;

export const completeStepSchema = stepSchema.extend({
  infographies: z.array(infographySchema),
  cards: z.array(completeCardSchema),
  items: z.array(completeItemSchema),
});
export type CompleteStep = z.infer<typeof completeStepSchema>;
