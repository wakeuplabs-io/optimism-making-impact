import { create } from 'zustand';

type Step = {
  id: string;
  name: string;
};

const hardCodedSteps: Step[] = [
  'Name of the Step 1',
  'Name of the Step 2',
  'Name of the Step 3',
  'Name of the Step 4',
  'Name of the Step 5',
].map((name, index) => ({
  id: index.toString(),
  name,
}));

interface StepsState {
  steps: Step[];
  selectedStep: Step;
  loading: boolean;
}

interface StepsActions {
  setSelectedStep: (by: Step) => void;
}

type StepsStore = StepsState & StepsActions;

export const useStepsStore = create<StepsStore>()((set) => ({
  loading: false,
  steps: hardCodedSteps,
  selectedStep: hardCodedSteps[0],
  setSelectedStep: (step: Step) => set((state) => ({ ...state, selectedStep: step })),
}));
