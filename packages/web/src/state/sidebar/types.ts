import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';

export interface SidebarState {
  error: string | null;
  rounds: CompleteRound[];
  selectedRound: CompleteRound | null;
  selectedCategoryId: number;
  categoriesInProgress: number[];
}

export interface SidebarActions {
  init: () => void;
  fetchData: () => Promise<void>;
  setSelectedRound: (roundId: number) => void;
  setSelectedCategoryId: (categoryId: number) => void;
  addRound: () => void;
  editRound: (roundId: number, data: UpdateRoundBody) => void;
  addCategory: (name: string, icon: string, roundId: number) => void;
  editCategory: (name: string, icon: string) => void;
  deleteCategory: (categoryId: number) => void;
  isCategoryInProgress: (categoryId: number) => boolean;
}

export type SidebarStore = SidebarState & SidebarActions;
