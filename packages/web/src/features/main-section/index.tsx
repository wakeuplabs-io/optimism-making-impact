import { StepTypeSelector } from '@/features/main-section/step-type-selector';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { CompleteStep } from '@/types';
import { useEffect } from 'react';

export function MainSection() {
  return (
    <main className='flex flex-col items-center flex-1 gap-8 p-4 pb-36 lg:pb-0 overflow-y-auto'>
      <MainSectionContent />
    </main>
  );
}

export function MainSectionContent() {
  const selectedStep = useStepsStore((state) => state.selectedStep);
  const mainSectionState = useMainSectionStore((state) => state);

  useEffect(() => {
    if (selectedStep) {
      mainSectionState.init(selectedStep.id);
    }
  }, [selectedStep?.id]);

  if (mainSectionState.loading) {
    return <span className='my-auto'>Loading...</span>;
  }

  if (!mainSectionState.step) {
    return <span className='my-auto'>Select a step to see its content</span>;
  }

  return <StepContent step={mainSectionState.step} />;
}

function StepContent(props: { step: CompleteStep }) {
  const { setKeywords, clearSelectedFilters, setAttributes } = useFiltersStore((state) => state);

  useEffect(() => {
    return () => clearSelectedFilters();
  }, []);

  useEffect(() => {
    setKeywords(props.step.keywords);
    setAttributes(props.step.smartList?.attributes || []);
  }, [props.step.keywords, props.step.smartList]);

  return <StepTypeSelector {...props} />;
}
