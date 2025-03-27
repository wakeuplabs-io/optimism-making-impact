import { commonFieldsSchema } from './helpers.js';
import { z } from 'zod';

export const keywordSchema = commonFieldsSchema.extend({
  value: z.string(),
  stepId: z.number(),
});
export type Keyword = z.infer<typeof keywordSchema>;
