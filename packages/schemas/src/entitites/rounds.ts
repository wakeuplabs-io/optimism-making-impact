import { commonFieldsSchema } from './helpers';
import { z } from 'zod';

const roundLinkSchema = z.string().nullish();

export const roundSchema = commonFieldsSchema.extend({
  link1: roundLinkSchema,
  link2: roundLinkSchema,
});
export type Round = z.infer<typeof roundSchema>;
