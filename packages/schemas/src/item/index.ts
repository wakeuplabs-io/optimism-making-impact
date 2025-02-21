import { z } from 'zod';
import { idValidator } from '../common';

const attributeIdValidator = idValidator('Attribute ID');
const stepIdValidator = idValidator('Step ID');

export const createItemSchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  stepId: z.number().superRefine(stepIdValidator),
  attributeId: z.number().superRefine(attributeIdValidator),
});

export type CreateItemBody = z.infer<typeof createItemSchema>;

export const updateItemSchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  attributeId: z.number().superRefine(attributeIdValidator),
});

export type UpdateItemBody = z.infer<typeof updateItemSchema>;
