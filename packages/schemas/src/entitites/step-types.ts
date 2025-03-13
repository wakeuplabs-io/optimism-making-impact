import { cardSchema } from './cards';
import { infographicSchema } from './infographics';
import { itemSchema } from './items';
import { baseStepSchema } from './steps';
import { z } from 'zod';

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
