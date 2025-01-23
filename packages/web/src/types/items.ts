import { attributeSchema } from '@/types/attributes';
import { Color } from '@/types/common';
import { z } from 'zod';

export const itemSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  position: z.number(),
  stepId: z.number(),
  color: z.nativeEnum(Color),
  attributeId: z.number().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Item = z.infer<typeof itemSchema>;

export const completeItemSchema = itemSchema.extend({
  attribute: attributeSchema.optional(),
});
export type CompleteItem = z.infer<typeof completeItemSchema>;
