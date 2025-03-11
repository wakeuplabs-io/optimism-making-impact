import { AutoSaveStatus } from '@/components/autosave-indicator/types';
import { CompleteStep } from '@/types';
import {
  BulkUpdateInfographicBody,
  CreateAttributeBody,
  CreateCardBody,
  CreateInfographicBody,
  CreateItemBody,
  Infographic,
  UpdateAttributeBody,
  UpdateCardBody,
  UpdateInfographicBody,
  UpdateItemBody,
} from '@optimism-making-impact/schemas';

export interface MainSectionState {
  error: string | null;
  loading: boolean;
  savingStatus: AutoSaveStatus;
  step: CompleteStep | null;
  stepInitialState: CompleteStep | null;
}

interface EditInfographicResult {
  infographic?: Infographic;
  error?: unknown;
}

export interface MainSectionActions {
  init: (stepId: number) => void;
  fetchData: (stepId: number) => void;
  updateStep: (step: Partial<CompleteStep>) => void;
  addInfographic: (data: CreateInfographicBody) => Promise<void>;
  deleteInfographic: (infographicId: number) => Promise<void>;
  editInfographic: (infographicId: number, data: Partial<UpdateInfographicBody>) => Promise<EditInfographicResult>;
  saveInfographics: (data: BulkUpdateInfographicBody) => void;
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
