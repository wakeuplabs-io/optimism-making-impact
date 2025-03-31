import { StepType as PrismaStepType, CardStrength as PrismaCardStrength, Color as PrismaColor } from '@optimism-making-impact/prisma';
import { z } from 'zod';

export const stepTypes = Object.values(PrismaStepType);
export const stepTypeSchema = z.nativeEnum(PrismaStepType);
export type StepType = z.infer<typeof stepTypeSchema>;

export const cardStrengthSchema = z.nativeEnum(PrismaCardStrength);
export type CardStrength = z.infer<typeof cardStrengthSchema>;
export const cardStrengthList = Object.values(PrismaCardStrength);

export const colorSchema = z.nativeEnum(PrismaColor);
export type Color = z.infer<typeof colorSchema>;
export const colorList = Object.values(PrismaColor);
