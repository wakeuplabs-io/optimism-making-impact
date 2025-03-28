import { cardSchema } from './cards.js';
import { categorySchema } from './category.js';
import { stepTypeSchema } from './enums.js';
import { commonFieldsSchema } from './helpers.js';
import { infographicSchema } from './infographics.js';
import { itemSchema } from './items.js';
import { keywordSchema } from './keywords.js';
import { z } from 'zod';

// Basic
export const baseStepSchema = commonFieldsSchema.extend({
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string(),
  position: z.number(),
  type: stepTypeSchema,
  categoryId: z.number(),
});
export type BaseStep = z.infer<typeof baseStepSchema>;

export const completeBaseStepSchema = baseStepSchema.extend({
  category: categorySchema,
  keywords: z.array(keywordSchema),
  smartListFilterId: z.number().nullable(),
});
export type CompleteBaseStep = z.infer<typeof completeBaseStepSchema>;

// Specifics

// INFOGRAPHIC step
export const infographicStepSchema = baseStepSchema.extend({
  type: z.literal('INFOGRAPHIC'),
});
export type InfographicStep = z.infer<typeof infographicStepSchema>;

export const completeInfographicStepSchema = infographicStepSchema.extend({
  infographics: z.array(infographicSchema),
});
export type CompleteInfographicStep = z.infer<typeof completeInfographicStepSchema>;

// CARDGRID step
export const cardGridStepSchema = baseStepSchema.extend({
  type: z.literal('CARDGRID'),
});
export type CardGridStep = z.infer<typeof cardGridStepSchema>;

export const completeCardGridStepSchema = cardGridStepSchema.extend({
  cards: z.array(cardSchema),
});
export type CompleteCardGridStep = z.infer<typeof completeCardGridStepSchema>;

// SMARTLIST step
export const smartListStepSchema = baseStepSchema.extend({
  type: z.literal('SMARTLIST'),
});
export type SmartListStep = z.infer<typeof smartListStepSchema>;

export const completeSmartListStepSchema = smartListStepSchema.extend({
  items: z.array(itemSchema),
});
export type CompleteSmartListStep = z.infer<typeof completeSmartListStepSchema>;
