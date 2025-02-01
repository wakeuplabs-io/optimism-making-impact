import { attributeSchema } from '@/types/attributes';
import { StrengthEnum } from '@/types/common';
import { keywordSchema } from '@/types/keywords';
import { z } from 'zod';

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  markdown: z.string(),
  strength: z.nativeEnum(StrengthEnum),
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Card = z.infer<typeof cardSchema>;

export const completeCardSchema = cardSchema.extend({
  attribute: attributeSchema.optional(),
  keywords: z.array(keywordSchema),
});
export type CompleteCard = z.infer<typeof completeCardSchema>;
