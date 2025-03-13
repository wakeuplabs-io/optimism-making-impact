import { commonFieldsSchema } from './helpers';
import { z } from 'zod';

export const infographicSchema = commonFieldsSchema.extend({
  markdown: z.string(),
  image: z.string(),
  position: z.number(),
  stepId: z.number(),
});
export type Infographic = z.infer<typeof infographicSchema>;
