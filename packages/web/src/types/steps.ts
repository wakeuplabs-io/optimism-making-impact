import { completeCardSchema } from '@/types/cards';
import { stepTypeSchema } from '@/types/common';
import { infographySchema } from '@/types/infographies';
import { completeItemSchema } from '@/types/items';
import { keywordSchema } from '@/types/keywords';
import { completeSmartListSchema } from '@/types/smart-lists';
import { z } from 'zod';

export const stepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  position: z.number(), // Zero-based
  type: stepTypeSchema,
  categoryId: z.number(),
  smartListId: z.number().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const stepArraySchema = z.array(stepSchema);
export type Step = z.infer<typeof stepSchema>;

export const completeStepSchema = stepSchema.extend({
  infographies: z.array(infographySchema),
  cards: z.array(completeCardSchema),
  items: z.array(completeItemSchema),
  smartList: completeSmartListSchema.optional(),
  keywords: z.array(keywordSchema),
});
export type CompleteStep = z.infer<typeof completeStepSchema>;
