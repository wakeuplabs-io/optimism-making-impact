import { Step } from '@/types/steps';
import { CreateStepBody, UpdateStepBody } from '@optimism-making-impact/schemas';
import { createContext } from 'react';

export type StepWithPosition = Step & { position: number };

interface StepsContextType {
  steps: StepWithPosition[];
  isLoading: boolean;
  error: Error | null;
  selectedStep: StepWithPosition | null;
  handleStepAdd(categoryId: number, data: CreateStepBody): void;
  handleStepSelect(step: number): void;
  handleStepDelete(stepId: number): void;
  handleStepEdit(stepId: number, data: UpdateStepBody): void;
}

export const StepsContext = createContext<StepsContextType | undefined>(undefined);
