import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  roundId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Category = z.infer<typeof categorySchema>;
