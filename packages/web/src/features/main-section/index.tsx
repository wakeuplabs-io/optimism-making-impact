import { StepTypeSelector } from '@/features/main-section/step-type-selector';
import { useStep } from '@/hooks/use-step';
import { useStepsList } from '@/hooks/use-steps-list';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { CompleteStep } from '@/types/steps';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

export function MainSectionContent() {
  const { steps } = useStepsList();
  const { step, isLoading: stepIsLoading } = useStep();

  if (stepIsLoading) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <LoaderCircle className='h-[78px] w-[78px] animate-spin text-gray-500 lg:h-16 lg:w-16' />
      </div>
    );
  }

  if (!step || steps.length === 0) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <span className='my-auto'>Select a step to see its content</span>
      </div>
    );
  }

  return <StepContent step={step} />;
}

function StepContent(props: { step: CompleteStep }) {
  const { setKeywords, clearSelectedFilters, setAttributes } = useFiltersStore((state) => state);

  useEffect(() => {
    return () => clearSelectedFilters();
  }, []);

  useEffect(() => {
    setKeywords(props.step.keywords);
    setAttributes(props.step.smartListFilter?.attributes || []);
  }, [props.step.keywords, props.step.smartListFilter]);

  return <StepTypeSelector {...props} />;
}
