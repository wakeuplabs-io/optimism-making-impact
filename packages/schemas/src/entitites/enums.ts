import { z } from 'zod';

export const stepTypes = ['INFOGRAPHIC', 'SMARTLIST', 'CARDGRID'] as const;
export const stepTypeSchema = z.enum(stepTypes);
export type StepType = z.infer<typeof stepTypeSchema>;
