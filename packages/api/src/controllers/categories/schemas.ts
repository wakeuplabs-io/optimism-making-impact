import { z } from 'zod';

export const getAllCategoriesSchema = z.object({
  roundId: z.string().transform(Number).optional(),
});

export const createCategoryBodySchema = z.object({
  name: z.string(),
  icon: z.string(),
  roundId: z.number(),
});

export const editCategoryBodySchema = z.object({
  name: z.string().optional(),
  icon: z.string().optional(),
});
