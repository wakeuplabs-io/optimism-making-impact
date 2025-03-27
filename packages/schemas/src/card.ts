
import { z } from 'zod';
import { cardStrengthSchema } from './entities/enums.js';

export const keywordValueSchema = z.object({
  value: z.string().min(1, { message: 'Keyword is required' }),
});

export const keywordSchema = keywordValueSchema.extend({
  id: z.number(),
});

export type Keyword = z.infer<typeof keywordSchema>;

const upsertKeywordSchema = keywordValueSchema.extend({
  id: z.number().optional(),
});

export const createCardBodySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  strength: cardStrengthSchema.default('MEDIUM'),
  stepId: z.number().refine((value) => !!value, {
    message: 'Step is required',
  }),
  attributeId: z.number().optional(),
  keywords: z.array(upsertKeywordSchema).optional().default([]),
});

export type CreateCardBody = z.infer<typeof createCardBodySchema>;

export const updateCardBodySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  markdown: z.string().min(1, { message: 'Markdown is required' }),
  strength: cardStrengthSchema.default('MEDIUM'),
  stepId: z.number().refine((value) => !!value, {
    message: 'Step is required',
  }),
  attributeId: z.number().optional(),
  keywords: z.array(upsertKeywordSchema).optional().default([]),
});

export type UpdateCardBody = z.infer<typeof updateCardBodySchema>;
