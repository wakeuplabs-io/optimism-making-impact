import { commonFieldsSchema } from './helpers';
import { z } from 'zod';

export const categorySchema = commonFieldsSchema.extend({
  name: z.string(),
  icon: z.string(),
  roundId: z.number(),
});
export type Category = z.infer<typeof categorySchema>;
