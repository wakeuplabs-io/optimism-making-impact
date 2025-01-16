import { Step } from '@/types';

export interface MainSectionState {
  error: string | null;
  loading: boolean;
  step: Step | null;
}

export interface MainSectionActions {
  fetchData: (stepId: number) => void;
  // setSelectedRound: (roundId: number) => void;
  // setSelectedCategoryId: (categoryId: number) => void;
  // addRound: () => void;
  // editRound: (roundId: number, data: Partial<Round>) => void;
  // addCategory: (name: string, icon: string, roundId: number) => void;
  // editCategory: (categoryId: number, name: string) => void;
  // deleteCategory: (categoryId: number) => void;
}

export type MainSectionStore = MainSectionState & MainSectionActions;
