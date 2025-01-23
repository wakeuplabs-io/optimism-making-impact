import { z } from 'zod';

export const stepTypes = ['INFOGRAPHY', 'ITEMS', 'CARD'] as const;
export const stepTypeSchema = z.enum(stepTypes);
export type StepType = z.infer<typeof stepTypeSchema>;
export const enum StepTypes {
  INFOGRAPHY,
  ITEMS,
  CARD,
}

export enum StrengthEnum {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export const strengthArray = [StrengthEnum.LOW, StrengthEnum.MEDIUM, StrengthEnum.HIGH];
