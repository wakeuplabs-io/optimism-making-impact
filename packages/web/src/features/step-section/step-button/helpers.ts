import { StepListStep } from '@/features/step-section/step-list';

export type StepButtonState = 'past' | 'active' | 'coming';

// TODO: CHECK: if this still works
export function getButtonState(step: StepListStep, selectedStep: StepListStep | null): StepButtonState {
  if (!selectedStep) return 'coming';
  if (selectedStep.position === step.position) return 'active';
  return selectedStep.position > step.position ? 'past' : 'coming';
}
