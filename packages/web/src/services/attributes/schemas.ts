import { Color } from '@/types';
import { z } from 'zod';

export const createAttributeBodySchema = z.object({
  value: z.string(),
  color: z.nativeEnum(Color),
  smartListId: z.number(),
});
export type CreateAttributeBody = z.infer<typeof createAttributeBodySchema>;

export const updateAttributeSchema = z.object({
  id: z.number(),
  value: z.string().optional(),
  color: z.nativeEnum(Color).optional(),
});
export type UpdateAttributeBody = z.infer<typeof updateAttributeSchema>;
