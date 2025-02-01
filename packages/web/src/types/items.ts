import { attributeSchema } from '@/types/attributes';
import { z } from 'zod';

export const itemSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Item = z.infer<typeof itemSchema>;

export const completeItemSchema = itemSchema.extend({
  attribute: attributeSchema,
});
export type CompleteItem = z.infer<typeof completeItemSchema>;
