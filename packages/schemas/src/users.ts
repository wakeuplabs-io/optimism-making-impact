import { z } from 'zod';

export const authGrantOrRevokeSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export type AuthGrantOrRevoke = z.infer<typeof authGrantOrRevokeSchema>;
