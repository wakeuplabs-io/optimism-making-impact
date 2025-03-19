import { z } from 'zod';

export const keywordSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export type Keyword = z.infer<typeof keywordSchema>;
