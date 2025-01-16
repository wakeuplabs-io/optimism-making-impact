import { StepTypeSelector } from '@/features/main-section/step-type-selector';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { useEffect } from 'react';

export function MainSectionContent() {
  const selectedStep = useStepsStore((state) => state.selectedStep);
  const mainSectionState = useMainSectionStore((state) => state);

  useEffect(() => {
    if (selectedStep) {
      mainSectionState.fetchData(selectedStep.id);
    }
  }, [selectedStep?.id]);

  if (mainSectionState.loading) {
    return <span>Loading...</span>;
  }

  if (!mainSectionState.step) {
    return <span>Select a step to see its content</span>;
  }

  return <StepTypeSelector step={mainSectionState.step} />;
}
