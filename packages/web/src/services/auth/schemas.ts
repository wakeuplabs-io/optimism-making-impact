import { z } from 'zod';

export const validateRequestSchema = z.object({
  token: z.string(),
});

export type LoginRequest = z.infer<typeof validateRequestSchema>;
