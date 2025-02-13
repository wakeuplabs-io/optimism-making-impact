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
  z
    .object({
      id: z.number(),
      markdown: z.string().optional(),
      image: z.string().optional(),
      stepId: z.number(),
    })
    .refine(
      (data) => {
        // Example: if Id is not present, markdown and image must also be present
        if (data.id < 0 && (!data.markdown || !data.image)) {
          return false;
        }

        return true;
      },
      {
        message: 'Both markdown and image must be provided together when creating a new infogrpahy',
      },
    ),
);

export type BulkUpdateInfographyBody = z.infer<typeof bulkUpdateInfogrpahyBodySchema>;
