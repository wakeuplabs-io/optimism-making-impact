import { Category, Round } from '@/types';

export interface SidebarState {
  loading: boolean;
  error: string | null;
  rounds: Round[];
  selectedRound: Round;
  categories: Category[];
  selectedCategoryId: number;
}

export type CategoryFormData = {
  title: string;
  iconURL: string;
};

export interface SidebarActions {
  setSelectedRound: (roundId: number) => void;
  setSelectedCategoryId: (categoryId: number) => void;
  setRounds: () => void;
  addRound: () => void;
  editRound: (roundId: number, data: Partial<Round>) => void;
  setCategories: () => void;
  addCategory: (formData: CategoryFormData, roundId: number) => void;
  editCategory: (categoryId: number, name: string) => void;
  deleteCategory: (categoryId: number) => void;
}

export type SidebarStore = SidebarState & SidebarActions;
