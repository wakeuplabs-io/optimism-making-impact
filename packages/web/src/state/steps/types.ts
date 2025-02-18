import { CreateStepBody, UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';

interface StepsState {
  steps: Step[];
  selectedStep: Step | null;
  searchSelectedStepId: number | null;
  loading: boolean;
  error: string;
}

interface StepsActions {
  fetchByCategoryId: (categoryId: number) => void;
  setSelectedStep: (position: number) => void;
  addStep: (roundId: number, data: CreateStepBody) => void;
  editStep: (stepId: number, data: UpdateStepBody) => void;
  deleteStep: (stepId: number) => void;
}

export type StepsStore = StepsState & StepsActions;
