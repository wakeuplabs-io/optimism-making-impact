import { CardStrength } from '@prisma/client';
import { z } from 'zod';

export const createCardBodySchema = z.object({
  title: z.string(),
  markdown: z.string(),
  strength: z.nativeEnum(CardStrength).default(CardStrength.MEDIUM),
  stepId: z.number(),
  attributeId: z.number().optional(),
  keywords: z
    .array(z.object({ value: z.string(), id: z.number().optional() }))
    .optional()
    .default([]),
});

export const updateCardBodySchema = z.object({
  title: z.string().optional(),
  markdown: z.string().optional(),
  strength: z.nativeEnum(CardStrength).default(CardStrength.MEDIUM),
  stepId: z.number(),
  attributeId: z.number().optional(),
  keywords: z
    .array(z.object({ value: z.string(), id: z.number().optional() }))
    .optional()
    .default([]),
});
