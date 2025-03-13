import { z } from 'zod';

export const stepTypes = ['INFOGRAPHIC', 'SMARTLIST', 'CARDGRID'] as const;
export const stepTypeSchema = z.enum(stepTypes);
export type StepType = z.infer<typeof stepTypeSchema>;

export const cardStrengthList = ['LOW', 'MEDIUM', 'HIGH'] as const;
export const cardStrengthSchema = z.enum(cardStrengthList);
export type CardStrength = z.infer<typeof cardStrengthSchema>;

export const colorList = ['RED', 'PINK', 'PURPLE', 'YELLOW', 'TAN', 'ORANGE', 'GREEN', 'LIGHTBLUE', 'BLUE', 'DARKBLUE'] as const;
export const colorSchema = z.enum(colorList);
export type Color = z.infer<typeof colorSchema>;
