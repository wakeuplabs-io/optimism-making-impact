import { z } from 'zod';

export const keywordSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export type Keyword = z.infer<typeof keywordSchema>;

export const completeKeywordSchema = z.object({
  id: z.number(),
  value: z.string(),
  color: z.string(),
});

export type CompleteKeyword = z.infer<typeof completeKeywordSchema>;
