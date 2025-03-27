import { colorSchema } from './enums.js';
import { commonFieldsSchema } from './helpers.js';
import { z } from 'zod';

export const attributeSchema = commonFieldsSchema.extend({
  value: z.string(),
  description: z.string(),
  categoryId: z.number(),
  color: colorSchema,
});

export type Attribute = z.infer<typeof attributeSchema>;
