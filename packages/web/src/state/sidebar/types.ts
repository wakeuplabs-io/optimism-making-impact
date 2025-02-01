import { CompleteRound, Round } from '@/types';

export interface SidebarState {
  error: string | null;
  rounds: CompleteRound[];
  selectedRound: CompleteRound | null;
  selectedCategoryId: number;
}

export interface SidebarActions {
  fetchData: () => void;
  setSelectedRound: (roundId: number) => void;
  setSelectedCategoryId: (categoryId: number) => void;
  addRound: () => void;
  editRound: (roundId: number, data: Partial<Round>) => void;
  addCategory: (name: string, icon: string, roundId: number) => void;
  editCategory: (categoryId: number, name: string) => void;
  deleteCategory: (categoryId: number) => void;
}

export type SidebarStore = SidebarState & SidebarActions;
