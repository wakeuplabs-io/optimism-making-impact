// infographics.ts
import { z } from 'zod';

export const infographicSchema = z.object({
  id: z.number(),
  markdown: z.string(),
  image: z.string(),
  position: z.number(),
  stepId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Infographic = z.infer<typeof infographicSchema>;
