import { StepType } from '@prisma/client';
import { z } from 'zod';

export const getAllQueryParms = z.object({
  roundId: z.string().transform(Number).optional(),
});

export const createBodySchema = z.object({
  title: z.string(),
  icon: z.string(),
  type: z.nativeEnum(StepType).default(StepType.INFOGRAPHY),
  roundId: z.number().min(1),
});

export const updateBodySchema = z.object({
  title: z.string().optional(),
  icon: z.string().optional(),
});
