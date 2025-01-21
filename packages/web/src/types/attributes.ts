import { z } from 'zod';

export const attributeSchema = z.object({
  id: z.number(),
  value: z.string(),
  categoryId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Type inference from the schema
export type Attribute = z.infer<typeof attributeSchema>;
