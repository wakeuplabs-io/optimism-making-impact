import { z } from 'zod';

export const createSmartListBodySchema = z.object({
  title: z.string(),
  stepId: z.number(),
});
