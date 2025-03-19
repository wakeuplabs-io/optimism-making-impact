import { StepTypeSelector } from '@/features/main-section/step-type-selector';
import { useStep } from '@/hooks/use-step';
import { useStepsList } from '@/hooks/use-steps-list';
import { LoaderCircle } from 'lucide-react';

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

  return <StepTypeSelector step={step} />;
}
