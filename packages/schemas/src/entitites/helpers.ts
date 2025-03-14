import { z } from 'zod';

export const commonFieldsSchema = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
