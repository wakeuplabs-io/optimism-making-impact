import { StepSkeletonSelector } from './step-types/step-skeleton-selector';
import { StepTypeSelector } from '@/features/main-section/step-type-selector';
import { useStep } from '@/hooks/use-step';
import { useStepsList } from '@/hooks/use-steps-list';
import { LoaderCircle } from 'lucide-react';

export function MainSectionContent() {
  const { steps, isLoading: stepsIsLoading, selectedStep } = useStepsList();
  const { step, isLoading: stepIsLoading } = useStep();

  if (stepsIsLoading) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <LoaderCircle className='h-[78px] w-[78px] animate-spin text-gray-500 lg:h-16 lg:w-16' />
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className='flex flex-grow items-center justify-center'>
        <span className='my-auto'>Create a new step to continue</span>
      </div>
    );
  }
  if (selectedStep && stepIsLoading) return <StepSkeletonSelector step={selectedStep!} />;

  if (!step) return;

  return <StepTypeSelector step={step} />;
}
