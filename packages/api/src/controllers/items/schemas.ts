import { z } from 'zod';

export const createItemSchema = z.object({
  markdown: z.string(),
  stepId: z.number(),
  attributeId: z.number(),
});

export const updateItemSchema = z.object({
  id: z.number(),
  markdown: z.string().optional(),
  attributeId: z.number().optional(),
});
