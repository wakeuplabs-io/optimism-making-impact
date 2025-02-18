import { z } from 'zod';

export const createCategoryBodySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  icon: z.string().min(1, { message: 'Icon is required' }),
  roundId: z.number().min(1, { message: 'RoundId is required' }),
});

export type CreateCategoryBody = z.infer<typeof createCategoryBodySchema>;
