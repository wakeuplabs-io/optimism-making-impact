import { z } from 'zod';

export const infographicSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  image: z.string(),
  stepId: z.number(),
  position: z.number(),
  createdAt: z.string(), // Assuming ISO 8601 date format as a string
  updatedAt: z.string(), // Assuming ISO 8601 date format as a string
});

// Type inference from the schema
export type Infographic = z.infer<typeof infographicSchema>;
