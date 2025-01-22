import { AutoSaveStatus } from '@/components/autosave-indicator/types';
import { CreateCardBody } from '@/services/cards/schemas';
import { BulkUpdateInfographyBody, CreateInfographyBody, UpdateInfographyBody } from '@/services/infogrpahies/schemas';
import { CompleteStep } from '@/types';

export interface MainSectionState {
  error: string | null;
  loading: boolean;
  savingStatus: AutoSaveStatus;
  step: CompleteStep | null;
  stepInitialState: CompleteStep | null;
}

export interface MainSectionActions {
  init: (stepId: number) => void;
  fetchData: (stepId: number) => void;
  addInfography: (data: CreateInfographyBody) => void;
  deleteInfogrpahy: (infographyId: number) => void;
  editInfogrpahy: (infographyId: number, data: UpdateInfographyBody) => void;
  saveInfographies: (data: BulkUpdateInfographyBody) => void;
  addCard: (data: CreateCardBody) => void;
}

export type MainSectionStore = MainSectionState & MainSectionActions;
