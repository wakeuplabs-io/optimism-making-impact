import { StepSeparator } from './step-separator';
import { getButtonState } from '@/features/step-section/step-button/helpers';
import { StepButton } from '@/features/step-section/step-button/step-button';
import { useCategoryList } from '@/hooks/use-category-list';
import { useStepsList } from '@/hooks/use-steps-list';
import { useIsDesktopXL } from '@/hooks/use-tresholds';
import { Step } from '@/types/steps';
import { LoaderCircle } from 'lucide-react';
import { Fragment, useMemo } from 'react';

export type StepListStep = Step & { position: number };

interface StepsListProps {
  isAdmin?: boolean;
}

export function StepsList(props: StepsListProps) {
  const isDesktopXL = useIsDesktopXL();
  const { steps, selectedStep, isLoading, error, handleStepSelect, handleStepDelete, handleStepEdit } = useStepsList();
  const { selectedCategory } = useCategoryList();
  if (!steps || error) {
    return null;
  }
  const selectedStepIdx = useMemo(() => steps.findIndex((step) => step.id === selectedStep?.id) ?? 0, [steps, selectedStep]);

  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <LoaderCircle className='h-[78px] w-[78px] animate-spin text-gray-500 lg:h-16 lg:w-16' />
      </div>
    );
  }
  if (!isLoading && steps.length === 0 && selectedCategory?.id) {
    return (
      <div className='flex max-w-full flex-1 justify-center overflow-hidden'>
        <span>There are no steps for this category.</span>
      </div>
    );
  }

  if (!isLoading && !selectedCategory?.id) {
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

        return (
          <Fragment key={`${step.id}-${step.title}`}>
            <StepButton
              // The step button width is dynamic based on the number of steps and the screen size for larger screens.
              // To calculate it we divide the screen width by the number of steps and subtract the gap between the separators and the width of a single separator dot.
              style={isDesktopXL ? { width: `calc((95%/${steps.length}) - 21px - 16px)` } : undefined}
              className={`shrink-0 2xl:max-w-[220px]`}
              state={buttonState}
              onClick={() => handleStepSelect(step)}
              step={step}
              isAdmin={props.isAdmin}
              onDelete={() => handleStepDelete(step.id)}
              onEdit={(id, data) => handleStepEdit(id, data)}
            />

            {idx < steps.length - 1 && <StepSeparator past={idx < selectedStepIdx} />}
          </Fragment>
        );
      })}
    </div>
  );
}
