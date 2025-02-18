import { z } from 'zod';

export const editCategoryBodySchema = z.object({
  name: z.string().optional(),
  icon: z.string().optional(),
});
