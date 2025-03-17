import { StepTypeSelector } from '@/features/main-section/step-type-selector';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

export function MainSectionContent() {
  const selectedStep = useStepsStore((state) => state.selectedStep);
  const stepsState = useStepsStore((state) => state);
  const mainSectionState = useMainSectionStore((state) => state);

  useEffect(() => {
    if (selectedStep) {
      mainSectionState.init(selectedStep.id);
    }
  }, [selectedStep?.id]);

  if (mainSectionState.loading) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <LoaderCircle className='h-[78px] w-[78px] animate-spin text-gray-500 lg:h-16 lg:w-16' />
      </div>
    );
  }

  if (!mainSectionState.step || stepsState.steps.length === 0) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <span className='my-auto'>Select a step to see its content</span>
      </div>
    );
  }

  return <StepTypeSelector step={mainSectionState.step} />;
}
