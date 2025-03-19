import { z } from 'zod';

export const validateRequestSchema = z.object({
  token: z.string(),
});
export type ValidateRequest = z.infer<typeof validateRequestSchema>;

export const userSchema = z.object({
  isAdmin: z.boolean(),
  authToken: z.string(),
  name: z.string(),
  email: z.string(),
});
export type User = z.infer<typeof userSchema>;

type ValidationSuccessResponse = { status: 'success'; user: User };
type ValidationFailureResponse = { status: 'error'; user: null };

export type ValidationResponse = ValidationSuccessResponse | ValidationFailureResponse;
