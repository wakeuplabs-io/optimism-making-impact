import { attributeSchema } from '@optimism-making-impact/schemas';
import { z } from 'zod';

export const smartListFilterSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type SmartListFilter = z.infer<typeof smartListFilterSchema>;

export const completeSmartListFilterSchema = smartListFilterSchema.extend({
  attributes: z.array(attributeSchema),
});
export type CompleteSmartListFilter = z.infer<typeof completeSmartListFilterSchema>;
