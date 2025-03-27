import { idValidator } from './common.js';
import { z } from 'zod';

const infogrpahicImageSchema = z.string().min(1, { message: 'Image is required' }).url({
  message: 'Image must be a valid URL',
});

export const createInfographicBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: infogrpahicImageSchema,
  stepId: z
    .number({
      required_error: 'Step is required',
    })
    .superRefine(idValidator('Step')),
});

export type CreateInfographicBody = z.infer<typeof createInfographicBodySchema>;

export const updateInfographicBodySchema = z.object({
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  image: infogrpahicImageSchema,
});

export type UpdateInfographicBody = z.infer<typeof updateInfographicBodySchema>;
