import { Step } from "@/types/steps";

export type StepButtonState = 'active' | 'coming';

// TODO: CHECK: if this still works
export function getButtonState(step: Step, selectedStep?: Step | null): StepButtonState {
  if (selectedStep?.id === step.id) return 'active';
  if (!selectedStep) return 'coming';
  return 'coming';
}
