import { completeCardSchema } from '@/types/cards';
import { completeItemSchema } from '@/types/items';
import { completeKeywordSchema } from '@/types/keywords';
import { completeSmartListFilterSchema } from '@/types/smart-list-filters';
import { infographicSchema, stepTypeSchema } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const stepSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullish(),
  icon: z.string(),
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
  smartListFilter: completeSmartListFilterSchema.nullish(),
  keywords: z.array(completeKeywordSchema),
});

export type CompleteStep = z.infer<typeof completeStepSchema>;
