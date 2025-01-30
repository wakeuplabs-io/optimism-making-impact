import { StrengthEnum } from '@/types';
import { z } from 'zod';

export const createCardBodySchema = z.object({
  title: z.string(),
  markdown: z.string(),
  strength: z.nativeEnum(StrengthEnum).default(StrengthEnum.MEDIUM),
  stepId: z.number(),
  attributeId: z.number().optional(),
  keywords: z
    .array(z.object({ value: z.string(), id: z.number().optional() }))
    .optional()
    .default([]),
});
export type CreateCardBody = z.infer<typeof createCardBodySchema>;
