import { Step } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
import { createContext } from 'react';

interface StepsContextType {
  steps: Step[];
  isLoading: boolean;
  error: Error | null;
  selectedStep?: Step;
  handleStepAdd(categoryId: number, data: CreateStepBody): void;
  handleStepSelect(step: Step): void;
  handleStepDelete(stepId: number): void;
  handleStepEdit(stepId: number, data: UpdateStepBody): void;
}

export const StepsContext = createContext<StepsContextType | undefined>(undefined);
