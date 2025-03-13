import { idValidator } from './common';
import { z } from 'zod';

export const infographicSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  image: z.string(),
  stepId: z.number(),
  position: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Infographic = z.infer<typeof infographicSchema>;

export const createInfographicBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
  stepId: z.number().superRefine(idValidator('Step')),
});

export type CreateInfographicBody = z.infer<typeof createInfographicBodySchema>;

export const updateInfographicBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
});

export type UpdateInfographicBody = z.infer<typeof updateInfographicBodySchema>;
