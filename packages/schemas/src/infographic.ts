import { idValidator } from './common';
import { z } from 'zod';

export const createInfographicBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
  stepId: z
    .number({
      required_error: 'Step is required',
    })
    .superRefine(idValidator('Step')),
});

export type CreateInfographicBody = z.infer<typeof createInfographicBodySchema>;

export const updateInfographicBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
});

export type UpdateInfographicBody = z.infer<typeof updateInfographicBodySchema>;
