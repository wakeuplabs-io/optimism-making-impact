import { attributeSchema } from '@/types/attributes';
import { z } from 'zod';

export const itemSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Item = z.infer<typeof itemSchema>;

export const completeItemSchema = itemSchema.extend({
  attribute: attributeSchema.optional(),
});
export type CompleteItem = z.infer<typeof completeItemSchema>;
