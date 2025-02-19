import { z } from 'zod';

export const getAllStepsQueryParams = z.object({
  categoryId: z.string().transform(Number).optional(),
});

export const stepTypes = ['INFOGRAPHY', 'ITEMS', 'CARD'] as const;
export const stepTypeSchema = z.enum(stepTypes);
export type StepType = z.infer<typeof stepTypeSchema>;

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
  smartListId: z.number().optional(),
});

export const createStepBodySchemaWithValidation = createStepBodySchema.refine((data) => !(data.type !== 'CARD' && data.smartListId), {
  message: 'Smart list id is required only for card type',
  path: ['smartListId'],
});

export type CreateStepBody = z.infer<typeof createStepBodySchema>;

export const updateStepBodySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  icon: z.string().min(1, { message: 'Icon is required' }),
  description: z.string().optional(),
});

export type UpdateStepBody = z.infer<typeof updateStepBodySchema>;
