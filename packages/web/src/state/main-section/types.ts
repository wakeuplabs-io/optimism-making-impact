import { AutoSaveStatus } from '@/components/autosave-indicator/types';
import {
  BulkUpdateInfographyBody,
  CreateAttributeBody,
  CreateInfographyBody,
  CreateItemBody,
  UpdateAttributeBody,
  UpdateInfographyBody,
  UpdateItemBody,
} from '@optimism-making-impact/schemas';
import { CompleteStep } from '@/types';
import { CreateCardBody, UpdateCardBody } from '@optimism-making-impact/schemas';

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
  editInfogrpahy: (infographyId: number, data: Partial<UpdateInfographyBody>) => void;
  saveInfographies: (data: BulkUpdateInfographyBody) => void;
  addCard: (data: CreateCardBody) => void;
  editCard: (cardId: number, data: UpdateCardBody) => void;
  deleteCard: (cardId: number) => void;
  addAttributeToSmartList: (data: CreateAttributeBody) => void;
  updateAttribute: (data: UpdateAttributeBody) => void;
  deleteAttribute: (attributeId: number) => void;
  addItem: (data: CreateItemBody) => void;
  updateItem: (itemId: number, data: UpdateItemBody) => void;
  deleteItem: (itemId: number) => void;
}

export type MainSectionStore = MainSectionState & MainSectionActions;
