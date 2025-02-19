import { z } from 'zod';

export const updateStepBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});
