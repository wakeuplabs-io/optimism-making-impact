import { z } from 'zod';
import { idValidator } from '../common';

export const colorList = ['RED', 'PINK', 'PURPLE', 'YELLOW', 'TAN', 'ORANGE', 'GREEN', 'LIGHTBLUE', 'BLUE', 'DARKBLUE'] as const;

export type Color = (typeof colorList)[number];

const colorSchema = z.enum(colorList);

export const attributeSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
  categoryId: z.number(),
  color: colorSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Type inference from the schema
export type Attribute = z.infer<typeof attributeSchema>;

export const createAttributeSchema = z.object({
  value: z.string().min(1, 'Value is required'),
  description: z.string().min(1, 'Description is required'),
  color: colorSchema.refine((value) => !!value, { message: 'Color is required' }),
  smartListId: z.number().superRefine(idValidator('Smart List')),
});

export type CreateAttributeBody = z.infer<typeof createAttributeSchema>;

export const updateAttributeSchema = z.object({
  id: z.number().superRefine(idValidator('ID')),
  value: z.string().min(1, 'Value is required'),
  description: z.string().min(1, 'Description is required'),
  color: colorSchema.refine((value) => !!value, { message: 'Color is required' }),
});

export type UpdateAttributeBody = z.infer<typeof updateAttributeSchema>;
