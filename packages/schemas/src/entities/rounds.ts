import { commonFieldsSchema } from './helpers.js';
import { z } from 'zod';

export const roundSchema = commonFieldsSchema.extend({
  link1: z.string(),
  link2: z.string(),
});
export type Round = z.infer<typeof roundSchema>;
