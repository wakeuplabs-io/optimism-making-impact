import { stepTypeSchema } from './entities/enums';
import { z } from 'zod';

export const getAllStepsQueryParams = z.object({
  categoryId: z.string().transform(Number).optional(),
});

export const createStepBodySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  icon: z.string().min(1, { message: 'Icon is required' }),
  type: stepTypeSchema.refine((val) => !!val, {
    message: 'Type is required',
  }),
  categoryId: z.number().refine((val) => !!val, {
    message: 'Category id is required',
  }),
  smartListFilterId: z.number().optional(),
});

/**
 * Schema for creating a step, with validation that smartListFilterId is required only for CARDGRID type.
 */
export const createStepBodySchemaWithValidation = createStepBodySchema.refine(
  (data) => !(data.type !== 'CARDGRID' && data.smartListFilterId),
  {
    message: 'Smart list filter id is required only for card type',
    path: ['smartListFilterId'],
  },
);

export type CreateStepBody = z.infer<typeof createStepBodySchema>;

export const updateStepBodySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  icon: z.string().min(1, { message: 'Icon is required' }),
  description: z.string().optional(),
});

export type UpdateStepBody = z.infer<typeof updateStepBodySchema>;
