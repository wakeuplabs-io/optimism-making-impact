import { attributeSchema } from '@/types/attributes';
import { keywordSchema } from '@/types/keywords';
import { z } from 'zod';

export enum StrengthEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export const strengthArray = [StrengthEnum.LOW, StrengthEnum.MEDIUM, StrengthEnum.HIGH];

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  markdown: z.string(),
  strength: z.nativeEnum(StrengthEnum),
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Card = z.infer<typeof cardSchema>;

export const completeCardSchema = cardSchema.extend({
  attribute: attributeSchema,
  keywords: z.array(keywordSchema),
});
export type CompleteCard = z.infer<typeof completeCardSchema>;
