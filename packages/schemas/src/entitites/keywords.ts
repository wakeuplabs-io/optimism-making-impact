import { z } from 'zod';

export const keywordSchema = z.object({
  id: z.number(),
  value: z.string(),
  stepId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Keyword = z.infer<typeof keywordSchema>;
