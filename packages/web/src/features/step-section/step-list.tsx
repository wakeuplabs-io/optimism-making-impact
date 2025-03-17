import { StepSeparator } from './step-separator';
import { getButtonState } from '@/features/step-section/step-button/helpers';
import { StepButton } from '@/features/step-section/step-button/step-button';
import { useIsDesktopXL } from '@/hooks/use-tresholds';
import { Step } from '@/types/steps';
import { LoaderCircle } from 'lucide-react';
import { Fragment, useMemo } from 'react';

export type StepListStep = Step & { position: number };

interface StepsListProps {
  steps: StepListStep[];
  selectedStep: StepListStep | null;
  selectedCategoryId?: number;
  isLoading: boolean;
  isAdmin?: boolean;
  error: unknown;
  onStepSelect: (step: Step) => void;
  onStepDelete: (stepId: number) => void;
  onStepEdit: (id: number, data: any) => void;
}

export function StepsList({
  steps,
  selectedStep,
  selectedCategoryId,
  isLoading,
  isAdmin,
  error,
  onStepSelect,
  onStepDelete,
  onStepEdit,
}: StepsListProps) {
  const isDesktopXL = useIsDesktopXL();

  const selectedStepIdx = useMemo(() => steps.findIndex((step) => step.id === selectedStep?.id) ?? 0, [steps, selectedStep]);

  if (!steps || error) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <LoaderCircle className='h-[78px] w-[78px] animate-spin text-gray-500 lg:h-16 lg:w-16' />
      </div>
    );
  }

  if (!isLoading && steps.length === 0 && selectedCategoryId) {
    return (
      <div className='flex max-w-full flex-1 justify-center overflow-hidden'>
        <span>There are no steps for this category.</span>
      </div>
    );
  }

  if (!isLoading && !selectedCategoryId) {
    return (
      <div className='h-[78px]'>
        <p>Select a category to see the steps</p>
      </div>
    );
  }

  return (
    <div className='flex flex-1 items-center justify-between gap-4 overflow-x-auto pb-2 lg:w-[95%] lg:justify-start'>
      {steps.map((step, idx) => {
        const buttonState = getButtonState(step, selectedStep);
        const stepWidth = isDesktopXL ? { width: `calc((95%/${steps.length}) - 21px - 16px)` } : undefined;

        return (
          <Fragment key={`${step.id}-${step.title}`}>
            <StepButton
              style={stepWidth}
              className='shrink-0 2xl:max-w-[220px]'
              state={buttonState}
              onClick={() => onStepSelect(step)}
              step={step}
              isAdmin={isAdmin}
              onDelete={() => onStepDelete(step.id)}
              onEdit={(id, data) => onStepEdit(id, data)}
            />

            {idx < steps.length - 1 && <StepSeparator past={idx < selectedStepIdx} />}
          </Fragment>
        );
      })}
    </div>
  );
}
