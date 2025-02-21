import { z } from 'zod';
import { idValidator } from '../common';

export const createInfographyBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: z.string().min(1, { message: 'Markdown is required' }),
  stepId: z.number().superRefine(idValidator('Step')),
});

export type CreateInfographyBody = z.infer<typeof createInfographyBodySchema>;

export const updateInfographyBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: z.string().min(1, { message: 'Markdown is required' }),
});

export type UpdateInfographyBody = z.infer<typeof updateInfographyBodySchema>;

export const bulkUpdateInfographyBodySchema = z.array(
  z.object({
    id: z.number().optional(),
    markdown: z.string().min(1, { message: 'Markdown is required' }),
    image: z.string().min(1, { message: 'Markdown is required' }),
    stepId: z.number().superRefine(idValidator('Step')),
  }),
);

export type BulkUpdateInfographyBody = z.infer<typeof bulkUpdateInfographyBodySchema>;
