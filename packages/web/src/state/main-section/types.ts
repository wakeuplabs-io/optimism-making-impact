import { BulkUpdateInfographyBody, CreateInfographyBody, UpdateInfographyBody } from '@/services/infogrpahies/schemas';
import { CompleteStep } from '@/types';

export interface MainSectionState {
  error: string | null;
  loading: boolean;
  saving: boolean;
  step: CompleteStep | null;
  stepInitialState: CompleteStep | null;
}

export interface MainSectionActions {
  init: (stepId: number) => void;
  fetchData: (stepId: number) => void;
  addInfography: (data: CreateInfographyBody) => void;
  deleteInfogrpahy: (infographyId: number) => void;
  editInfogrpahy: (infographyId: number, data: UpdateInfographyBody) => void;
  saveInfogrpahies: (data: BulkUpdateInfographyBody) => void;
}

export type MainSectionStore = MainSectionState & MainSectionActions;
