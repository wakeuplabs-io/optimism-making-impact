import { attributeSchema } from '@/types/attributes';
import { z } from 'zod';

export const smartListSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type SmartList = z.infer<typeof smartListSchema>;

export const completeSmartListSchema = smartListSchema.extend({
  attributes: z.array(attributeSchema),
});
export type CompleteSmartList = z.infer<typeof completeSmartListSchema>;
