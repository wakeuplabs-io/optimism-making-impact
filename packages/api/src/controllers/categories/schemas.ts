import { z } from 'zod';

export const getAllCategoriesSchema = z.object({
  roundId: z.string().transform(Number).optional(),
});

export const editCategoryBodySchema = z.object({
  name: z.string().optional(),
  icon: z.string().optional(),
});
