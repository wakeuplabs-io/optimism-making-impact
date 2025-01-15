import { stepTypeSchema } from '@/types';
import { z } from 'zod';

export const createBodySchema = z.object({
  title: z.string(),
  icon: z.string(),
  type: stepTypeSchema.optional(),
  roundId: z.string().transform(Number),
});
export type CreateBody = z.infer<typeof createBodySchema>;

export const updateBodySchema = z.object({
  title: z.string().optional(),
  icon: z.string().optional(),
});
export type UpdateBody = z.infer<typeof updateBodySchema>;
