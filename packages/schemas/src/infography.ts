import { z } from 'zod';
import { idValidator } from './common';

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

export const bulkUpdateInfographicBodySchema = z.array(
  z.object({
    id: z.number().optional(),
    markdown: z.string().min(1, { message: 'Markdown is required' }),
    image: z.string().min(1, { message: 'Image is required' }),
    stepId: z.number().superRefine(idValidator('Step')),
  }),
);

export type BulkUpdateInfographicBody = z.infer<typeof bulkUpdateInfographicBodySchema>;
