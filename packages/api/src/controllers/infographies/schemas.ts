import { z } from 'zod';

export const createInfogrpahyBodySchema = z.object({
  markdown: z.string().min(1),
  image: z.string().min(1),
  stepId: z.number().min(1),
});

export const updateInfogrpahyBodySchema = z.object({
  markdown: z.string().min(1),
  image: z.string().min(1),
});
