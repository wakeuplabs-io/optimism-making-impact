import { z } from 'zod';

export const createInfogrpahyBodySchema = z.object({
  markdown: z.string(),
  image: z.string(),
  stepId: z.number(),
});

export const updateInfogrpahyBodySchema = z.object({
  markdown: z.string().optional(),
  image: z.string().optional(),
});

export const bulkUpdateInfogrpahyBodySchema = z.array(
  z.object({
    id: z.number(),
    markdown: z.string().optional(),
    image: z.string().optional(),
  }),
);
