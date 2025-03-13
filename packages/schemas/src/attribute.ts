import { idValidator } from './common';
import { colorSchema } from './entitites';
import { z } from 'zod';

/**
 * @deprecated Use NEW_attributeSchema from the entities folder instead.
 */
export const attributeSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
  categoryId: z.number(),
  color: colorSchema,
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
});

/**
 * @deprecated Use NEW_attributeSchema from the entities folder instead.
 */
export type Attribute = z.infer<typeof attributeSchema>;

export const createAttributeSchema = z.object({
  value: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  color: colorSchema.refine((value) => !!value, { message: 'Color is required' }),
  smartListFilterId: z.number().superRefine(idValidator('Smart List')),
});

export type CreateAttributeBody = z.infer<typeof createAttributeSchema>;

export const updateAttributeSchema = z.object({
  id: z.number().superRefine(idValidator('ID')),
  value: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  color: colorSchema.refine((value) => !!value, { message: 'Color is required' }),
});

export type UpdateAttributeBody = z.infer<typeof updateAttributeSchema>;
