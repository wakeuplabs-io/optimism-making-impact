import { StepType } from '@prisma/client';
import { z } from 'zod';

export const getAllStepsQueryParms = z.object({
  categoryId: z.string().transform(Number).optional(),
});

export const createStepBodySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string(),
  type: z.nativeEnum(StepType).default(StepType.INFOGRAPHY),
  categoryId: z.number().min(1),
  smartListId: z.number().optional(),
});

export const updateStepBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
});
