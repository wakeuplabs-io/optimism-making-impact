import { z } from 'zod';

export enum StrengthEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const updateCardBodySchema = z.object({
  title: z.string().optional(),
  markdown: z.string().optional(),
  strength: z.nativeEnum(StrengthEnum).default(StrengthEnum.MEDIUM),
  stepId: z.number(),
  attributeId: z.number().optional(),
  keywords: z
    .array(z.object({ value: z.string(), id: z.number().optional() }))
    .optional()
    .default([]),
});
export type UpdateCardBody = z.infer<typeof updateCardBodySchema>;
