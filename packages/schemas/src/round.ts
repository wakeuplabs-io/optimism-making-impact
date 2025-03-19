import { z } from 'zod';

export const updateRoundLinkBodySchema = z.object({
  link: z.string().optional(),
});

export type UpdateRoundLinkBody = z.infer<typeof updateRoundLinkBodySchema>;

export const updateRoundBodySchema = z.object({
  link1: z.string().optional(),
  link2: z.string().optional(),
});

export type UpdateRoundBody = z.infer<typeof updateRoundBodySchema>;
