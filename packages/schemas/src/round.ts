import { z } from 'zod';

// Define schemas for each link type
const link1Schema = z.object({
  link1: z.string().url({ message: 'Link 1 must be a valid URL' }).min(1, { message: 'Link 1 is required' }),
});

const link2Schema = z.object({
  link2: z.string().url({ message: 'Link 2 must be a valid URL' }).min(1, { message: 'Link 2 is required' }),
});

export type Link1Schema = z.infer<typeof link1Schema>;
export type Link2Schema = z.infer<typeof link2Schema>;

// Combine the schemas with a union
export const updateRoundBodySchema = z.union([link1Schema, link2Schema]);

export type UpdateRoundBody = z.infer<typeof updateRoundBodySchema>;
