import { AutoSaveStatus } from '@/components/autosave-indicator/types';
import { CreateAttributeBody, UpdateAttributeBody } from '@/services/attributes/schemas';
import { CreateCardBody } from '@/services/cards/schemas';
import { BulkUpdateInfographyBody, CreateInfographyBody, UpdateInfographyBody } from '@/services/infogrpahies/schemas';
import { CreateItemBody } from '@/services/items/schemas';
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
  addAttributeToSmartList: (data: CreateAttributeBody) => void;
  updateAttribute: (data: UpdateAttributeBody) => void;
  addItem: (data: CreateItemBody) => void;
}

export type MainSectionStore = MainSectionState & MainSectionActions;
