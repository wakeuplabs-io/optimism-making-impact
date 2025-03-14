import { StepTypeSelector } from '@/features/main-section/step-type-selector';
import { useIsMobile } from '@/hooks/use-tresholds';
import { cn } from '@/lib/utils';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { CompleteStep } from '@/types/steps';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

export function MainSection() {
  const isMobile = useIsMobile();
  return (
    //we add overflow-y-auto so only the main section scrolls on mobile
    <main
      className={cn('flex flex-1 flex-col gap-8 px-8 pb-36 lg:px-0 lg:pb-0', {
        'overflow-y-auto': isMobile,
      })}
    >
      <MainSectionContent />
    </main>
  );
}

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

  return <StepContent step={mainSectionState.step} />;
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
