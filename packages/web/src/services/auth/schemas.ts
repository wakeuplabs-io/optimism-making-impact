import { z } from 'zod';

export const validateRequestSchema = z.object({
  token: z.string(),
});

export const validateResponseSchema = z.object({
  isAdmin: z.boolean(),
  authToken: z.string(),
  name: z.string(),
  email: z.string(),
});

export type ValidateRequest = z.infer<typeof validateRequestSchema>;
export type ValidateResponse = z.infer<typeof validateResponseSchema>;
