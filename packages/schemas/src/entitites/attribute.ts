import { colorSchema } from './enums';
import { commonFieldsSchema } from './helpers';
import { z } from 'zod';

/**
 * This schema should replace the deprecated one in the src/attribute.ts file.
 */
export const NEW_attributeSchema = commonFieldsSchema.extend({
  value: z.string(),
  description: z.string(),
  categoryId: z.number(),
  color: colorSchema,
});

/**
 * This type should replace the deprecated one in the src/attribute.ts file.
 */
export type NEW_Attribute = z.infer<typeof NEW_attributeSchema>;
