// items.ts
import { z } from 'zod';

export const itemSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  position: z.number(),
  stepId: z.number(),
  attributeId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Item = z.infer<typeof itemSchema>;
