import { Category, Round } from '@/types';

export interface SidebarState {
  error: string | null;
  rounds: Round[];
  selectedRound: Round;
  categories: Category[];
  selectedCategoryId: number;
}

export interface SidebarActions {
  setSelectedRound: (roundId: number) => void;
  setSelectedCategoryId: (categoryId: number) => void;
  setRounds: () => void;
  addRound: () => void;
  editRound: (roundId: number, data: Round) => void;
  setCategories: () => void;
  addCategory: (name: string, icon: string, roundId: number) => void;
  editCategory: (categoryId: number, name: string) => void;
  deleteCategory: (categoryId: number) => void;
}

export type SidebarStore = SidebarState & SidebarActions;
