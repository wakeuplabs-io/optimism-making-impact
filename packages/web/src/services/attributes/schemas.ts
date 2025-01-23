import { Color } from '@/types';
import { z } from 'zod';

export const createAttributeBodySchema = z.object({
  value: z.string(),
  color: z.nativeEnum(Color).optional(),
  smartListId: z.number(),
});
export type CreateAttributeBody = z.infer<typeof createAttributeBodySchema>;
