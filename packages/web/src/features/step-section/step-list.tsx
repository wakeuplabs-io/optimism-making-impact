import { getButtonState } from '@/features/step-section/step-button/helpers';
import { StepButton } from '@/features/step-section/step-button/step-button';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { StepSeparator } from './step-separator';
import { useIsDesktopXL } from '@/hooks/use-tresholds';
import { useMemo } from 'react';

interface StepsListProps {
  steps: Step[];
  selectedStep: Step | null;
  onEditStep: (stepId: number, data: UpdateStepBody) => void;
  onDeleteStep: (stepId: number) => void;
  onSelectStep: (stepId: number) => void;
  isAdmin?: boolean;
}

export function StepsList(props: StepsListProps) {
  const isDesktopXL = useIsDesktopXL();
  const selectedStepIdx = useMemo(
    () => props.steps.findIndex((step) => step.id === props.selectedStep?.id) ?? 0,
    [props.steps, props.selectedStep],
  );

  if (props.steps.length === 0) {
    return (
      <div className='flex justify-center flex-1 max-w-full overflow-hidden'>
        <span>There are no steps for this round.</span>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between flex-1 overflow-x-auto lg:w-[95%] gap-4 lg:justify-start lg:overflow-hidden'>
      {props.steps.map((step, idx) => {
        const buttonState = getButtonState(step, props.selectedStep);

        return (
          <>
            <StepButton
              // The step button width is dynamic based on the number of steps and the screen size for larger screens.
              // To calculate it we divide the screen width by the number of steps and subtract the gap between the separators and the width of a single separator dot.
              style={isDesktopXL ? { width: `calc((95%/${props.steps.length}) - 21px - 16px)` } : undefined}
              className={`shrink-0 2xl:max-w-[220px]`}
              state={buttonState}
              key={`${step.id}-${step.title}`}
              onClick={() => props.onSelectStep(step.id)}
              step={step}
              isAdmin={props.isAdmin}
              onDelete={props.onDeleteStep}
              onEdit={props.onEditStep}
            />
            {idx < props.steps.length - 1 && <StepSeparator past={idx > selectedStepIdx - 1} />}
          </>
        );
      })}
    </div>
  );
}
