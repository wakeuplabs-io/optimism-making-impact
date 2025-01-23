import { Category } from '@/types';

// TODO: use prisma to keep in sync
export type Round = {
  id: number;
  link1: string;
  link2: string;
};

export type RoundWithCategories = {
  id: number;
  link1: string;
  link2: string;
  categories: Category[];
};
