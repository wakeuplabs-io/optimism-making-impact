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
}

export type StepsStore = StepsState & StepsActions;
