import { CreateStepBody, UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';

interface StepsState {
  steps: Step[];
  selectedStepPosition: number; // Zero-based
  loading: boolean;
  error: string;
}

interface StepsActions {
  fetchByRoundId: (roundId: number) => void;
  setSelectedStepPosition: (position: number) => void;
  addStep: (roundId: number, data: CreateStepBody) => void;
  editStep: (stepId: number, data: UpdateStepBody) => void;
  deleteStep: (stepId: number) => void;
}

export type StepsStore = StepsState & StepsActions;
