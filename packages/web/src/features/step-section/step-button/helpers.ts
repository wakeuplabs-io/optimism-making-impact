import { Step } from '@/types';

export type StepButtonState = 'past' | 'active' | 'coming';

export function getButtonState(step: Step, selectedStep: Step | null): StepButtonState {
  if (!selectedStep) return 'coming';
  if (selectedStep.position === step.position) return 'active';
  return selectedStep.position > step.position ? 'past' : 'coming';
}
