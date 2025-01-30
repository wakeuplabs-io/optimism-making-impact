import { z } from 'zod';

export const keywordSchema = z.object({
  id: z.number(),
  value: z.string(),
});

// Type inference from the schema
export type Keyword = z.infer<typeof keywordSchema>;
