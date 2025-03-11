import { completeCardSchema } from '@/types/cards';
import { infographicSchema } from '@/types/infographics';
import { completeItemSchema } from '@/types/items';
import { keywordSchema } from '@/types/keywords';
import { completeSmartListFilterSchema } from '@/types/smart-list-filters';
import { stepTypeSchema } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const stepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  icon: z.string(),
  position: z.number(), // Zero-based
  type: stepTypeSchema,
  categoryId: z.number(),
  smartListId: z.number().nullish(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const stepArraySchema = z.array(stepSchema);
export type Step = z.infer<typeof stepSchema>;

export const completeStepSchema = stepSchema.extend({
  infographics: z.array(infographicSchema),
  cards: z.array(completeCardSchema),
  items: z.array(completeItemSchema),
  smartListFilter: completeSmartListFilterSchema.nullish(), // TODO:
  keywords: z.array(keywordSchema),
});

export type CompleteStep = z.infer<typeof completeStepSchema>;
