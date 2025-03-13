// cards.ts
import { cardStrengthSchema } from './enums';
import { z } from 'zod';

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  markdown: z.string(),
  strength: cardStrengthSchema,
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Card = z.infer<typeof cardSchema>;
