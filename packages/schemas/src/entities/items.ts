import { commonFieldsSchema } from './helpers';
import { z } from 'zod';

export const itemSchema = commonFieldsSchema.extend({
  markdown: z.string(),
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number().nullable(),
});
export type Item = z.infer<typeof itemSchema>;
