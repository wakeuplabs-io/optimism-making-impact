import { z } from 'zod';

export const idParamsSchema = z.object({
  id: z.string().transform(Number),
});
