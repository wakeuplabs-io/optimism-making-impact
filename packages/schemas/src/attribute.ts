import { idValidator } from './common';
import { colorSchema } from './entities';
import { z } from 'zod';

export const createAttributeSchema = z.object({
  value: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  color: colorSchema.refine((value) => !!value, { message: 'Color is required' }),
  smartListFilterId: z
    .number({
      required_error: 'Smart List is required',
    })
    .superRefine(idValidator('Smart List')),
});

export type CreateAttributeBody = z.infer<typeof createAttributeSchema>;

export const updateAttributeSchema = z.object({
  id: z.number().superRefine(idValidator('ID')),
  value: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  color: colorSchema.refine((value) => !!value, { message: 'Color is required' }),
});

export type UpdateAttributeBody = z.infer<typeof updateAttributeSchema>;
