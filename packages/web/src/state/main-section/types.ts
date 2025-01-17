import { UpdateInfographyBody } from '@/services/infogrpahies/schemas';
import { CompleteStep } from '@/types';

export interface MainSectionState {
  error: string | null;
  loading: boolean;
  step: CompleteStep | null;
}

export interface MainSectionActions {
  fetchData: (stepId: number) => void;
  deleteInfogrpahy: (infographyId: number) => void;
  editInfogrpahy: (infographyId: number, data: UpdateInfographyBody) => void;
  // setSelectedRound: (roundId: number) => void;
  // setSelectedCategoryId: (categoryId: number) => void;
  // addRound: () => void;
  // editRound: (roundId: number, data: Partial<Round>) => void;
  // addCategory: (name: string, icon: string, roundId: number) => void;
  // deleteCategory: (categoryId: number) => void;
}

export type MainSectionStore = MainSectionState & MainSectionActions;
