import { completeKeywordSchema } from '@/types/keywords';
import { attributeSchema, cardStrengthList } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  markdown: z.string(),
  strength: z.enum(cardStrengthList),
  stepId: z.number(),
  attributeId: z.number().nullish(),
});
export type Card = z.infer<typeof cardSchema>;

export const completeCardSchema = cardSchema.extend({
  attribute: attributeSchema.nullish(),
  keywords: z.array(completeKeywordSchema),
});

export type CompleteCard = z.infer<typeof completeCardSchema>;
