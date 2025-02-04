import { z } from 'zod';

export const getAllCategoriesSchema = z.object({
  roundId: z.string().transform(Number).optional(),
});

export const createCategoryBodySchema = z.object({
  title: z.string(),
  icon: z.string(),
  roundId: z.string().transform(Number),
});

export const editCategoryBodySchema = z.object({
  title: z.string().optional(),
  icon: z.string().optional(),
});
