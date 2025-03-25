import { colorSchema } from './enums';
import { commonFieldsSchema } from './helpers';
import { z } from 'zod';

export const attributeSchema = commonFieldsSchema.extend({
  value: z.string(),
  description: z.string(),
  categoryId: z.number(),
  color: colorSchema,
});

export type Attribute = z.infer<typeof attributeSchema>;
