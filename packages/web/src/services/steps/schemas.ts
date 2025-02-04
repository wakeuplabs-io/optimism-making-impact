import { stepTypeSchema } from '@/types';
import { z } from 'zod';

export const createStepBodySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string(),
  type: stepTypeSchema,
  categoryId: z.string().transform(Number),
  smartListId: z.number().optional(),
});
export type CreateStepBody = z.infer<typeof createStepBodySchema>;

export const updateStepBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});
export type UpdateStepBody = z.infer<typeof updateStepBodySchema>;
