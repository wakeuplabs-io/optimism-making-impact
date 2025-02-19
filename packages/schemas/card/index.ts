import { z } from 'zod';

export const cardStrengthList = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type CardStrength = (typeof cardStrengthList)[number];

export const keywordValueSchema = z.object({
  value: z.string().min(1, { message: 'Keyword is required' }),
});

export const keywordSchema = keywordValueSchema.extend({
  id: z.number(),
});

export type Keyword = z.infer<typeof keywordSchema>;

export const createCardBodySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  strength: z.enum(cardStrengthList).default('MEDIUM'),
  stepId: z.number().refine((value) => !!value, {
    message: 'Step is required',
  }),
  attributeId: z.number().optional(),
  keywords: z
    .array(
      keywordValueSchema.extend({
        id: z.number().optional(),
      }),
    )
    .optional()
    .default([]),
});

export type CreateCardBody = z.infer<typeof createCardBodySchema>;
