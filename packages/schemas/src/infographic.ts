import { z } from 'zod';
import { idValidator } from './common';

export const infographicSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  image: z.string(),
  stepId: z.number(),
  position: z.number(),
  createdAt: z.string(), // Assuming ISO 8601 date format as a string
  updatedAt: z.string(), // Assuming ISO 8601 date format as a string
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

export const bulkUpdateInfographicBodySchema = z.array(
  z.object({
    id: z.number().optional(),
    markdown: z.string().min(1, { message: 'Markdown is required' }),
    image: z.string().min(1, { message: 'Image is required' }),
    stepId: z.number().superRefine(idValidator('Step')),
  }),
);

export type BulkUpdateInfographicBody = z.infer<typeof bulkUpdateInfographicBodySchema>;
