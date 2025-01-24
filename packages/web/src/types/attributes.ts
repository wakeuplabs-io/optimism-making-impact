import { Color } from '@/types';
import { z } from 'zod';

export const attributeSchema = z.object({
  id: z.number(),
  value: z.string(),
  description: z.string(),
  categoryId: z.number(),
  color: z.nativeEnum(Color),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Type inference from the schema
export type Attribute = z.infer<typeof attributeSchema>;
