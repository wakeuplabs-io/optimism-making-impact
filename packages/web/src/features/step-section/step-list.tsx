import { getButtonState } from '@/features/step-section/step-button/helpers';
import { StepButton } from '@/features/step-section/step-button/step-button';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { StepSeparator } from './step-separator';

interface StepsListProps {
  steps: Step[];
  selectedStep: Step | null;
  onEditStep: (stepId: number, data: UpdateStepBody) => void;
  onDeleteStep: (stepId: number) => void;
  onSelectStep: (stepId: number) => void;
  isAdmin?: boolean;
}

export function StepsList(props: StepsListProps) {
  if (props.steps.length === 0) {
    return (
      <div className='flex justify-center flex-1 max-w-full overflow-hidden'>
        <span>There are no steps for this round.</span>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between flex-1 max-w-full overflow-hidden gap-4'>
      {props.steps.map((step, idx) => {
        const buttonState = getButtonState(step, props.selectedStep);

        return (
          <>
            <StepButton
              state={buttonState}
              key={`${step.id}-${step.title}`}
              onClick={() => props.onSelectStep(step.id)}
              step={step}
              isAdmin={props.isAdmin}
              onDelete={props.onDeleteStep}
              onEdit={props.onEditStep}
            />
            {idx < props.steps.length - 1 && <StepSeparator />}
          </>
        );
      })}
    </div>
  );
}
