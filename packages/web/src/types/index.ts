import { z } from 'zod';

// TODO: use prisma to keep in sync
export type Round = {
  id: number;
  icon?: string;
  name: string;
  link1: string;
  link2: string;
};

export type RoundWithCategories = {
  id: number;
  icon?: string;
  name: string;
  link1: string;
  link2: string;
  categories: Category[];
};

export type Category = {
  id: number;
  roundId: number;
  name: string;
  icon?: string;
};

export const stepTypeSchema = z.enum(['INFOGRAPHY', 'ITEMS', 'CARD']);
export type StepType = z.infer<typeof stepTypeSchema>;

export const stepSchema = z.object({
  id: z.number(),
  title: z.string(),
  icon: z.string(),
  position: z.number(), // Zero-based
  type: stepTypeSchema,
  roundId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const stepArraySchema = z.array(stepSchema);

export type Step = z.infer<typeof stepSchema>;
