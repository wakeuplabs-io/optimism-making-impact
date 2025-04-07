import { commonFieldsSchema } from './helpers';
import { z } from 'zod';

export const roundSchema = commonFieldsSchema.extend({
  link1: z.string().url(),
  link2: z.string().url(),
});
export type Round = z.infer<typeof roundSchema>;
