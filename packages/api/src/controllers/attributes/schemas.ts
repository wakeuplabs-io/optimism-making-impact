import { Color } from '@prisma/client';
import { z } from 'zod';

export const createAttributeSchema = z.object({
  value: z.string(),
  color: z.nativeEnum(Color).optional(),
  smartListId: z.number(),
});
