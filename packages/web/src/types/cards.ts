import { cardStrengthList, keywordSchema, attributeSchema } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  markdown: z.string(),
  strength: z.enum(cardStrengthList),
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number().nullable().optional(),
});
export type Card = z.infer<typeof cardSchema>;

export const completeCardSchema = cardSchema.extend({
  attribute: attributeSchema.optional(),
  keywords: z.array(keywordSchema),
});

export type CompleteCard = z.infer<typeof completeCardSchema>;
