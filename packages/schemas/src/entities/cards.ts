// cards.ts
import { cardStrengthSchema } from './enums.js';
import { commonFieldsSchema } from './helpers.js';
import { z } from 'zod';

export const cardSchema = commonFieldsSchema.extend({
  title: z.string(),
  markdown: z.string(),
  strength: cardStrengthSchema,
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number().nullable(),
});
export type Card = z.infer<typeof cardSchema>;
