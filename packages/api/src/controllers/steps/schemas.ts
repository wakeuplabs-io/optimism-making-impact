import { StepType } from '@prisma/client';
import { z } from 'zod';

export const idParamsSchema = z.object({
  id: z.string().transform(Number),
});

export const roundIdParamsSchema = z.object({
  roundId: z.string().transform(Number),
});

export const createBodySchema = z.object({
  title: z.string(),
  icon: z.string(),
  type: z.nativeEnum(StepType).default(StepType.INFOGRAPHY),
  roundId: z.string().transform(Number),
});

export const updateBodySchema = z.object({
  title: z.string().optional(),
  icon: z.string().optional(),
});
