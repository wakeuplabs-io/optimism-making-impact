import { z } from 'zod';

export const authValidateSchema = z.object({
  token: z
    .string({
      required_error: 'Token is required',
      invalid_type_error: 'Token must be a string',
    })
    .min(1, 'Token cannot be empty'),
});
