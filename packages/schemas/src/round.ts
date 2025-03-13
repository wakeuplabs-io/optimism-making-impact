import { z } from 'zod';

export const roundLinkSchema = z.string().nullish();

export const roundSchema = z.object({
  id: z.number(),
  link1: roundLinkSchema,
  link2: roundLinkSchema,
  createdAt: z.string().datetime().nullish(),
  updatedAt: z.string().datetime().nullish(),
});

export type Round = z.infer<typeof roundSchema>;

export const updateRoundBodySchema = z.object({
  link1: z.string().optional(),
  link2: z.string().optional(),
});

export type UpdateRoundBody = z.infer<typeof updateRoundBodySchema>;
