import { idValidator } from './common';
import { z } from 'zod';

export const colorList = ['RED', 'PINK', 'PURPLE', 'YELLOW', 'TAN', 'ORANGE', 'GREEN', 'LIGHTBLUE', 'BLUE', 'DARKBLUE'] as const;

export type Color = (typeof colorList)[number];

const colorSchema = z.enum(colorList);

export const attributeSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
  categoryId: z.number(),
  color: colorSchema,
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
});

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
