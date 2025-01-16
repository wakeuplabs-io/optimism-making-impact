import { z } from 'zod';

export const createInfographyBodySchema = z.object({
  markdown: z.string().min(1),
  image: z.string().min(1),
  stepId: z.number().min(1),
});
export type CreateInfographyBody = z.infer<typeof createInfographyBodySchema>;

export const updateInfographyBodySchema = z.object({
  markdown: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
});
export type UpdateInfographyBody = z.infer<typeof updateInfographyBodySchema>;
