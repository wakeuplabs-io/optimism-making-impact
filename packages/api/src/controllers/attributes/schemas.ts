import { Color } from '@prisma/client';
import { z } from 'zod';

export const createAttributeSchema = z.object({
  value: z.string(),
  description: z.string(),
  color: z.nativeEnum(Color).optional(),
  smartListId: z.number(),
});

export const updateAttributeSchema = z.object({
  id: z.number(),
  value: z.string().optional(),
  description: z.string().optional(),
  color: z.nativeEnum(Color).optional(),
});
