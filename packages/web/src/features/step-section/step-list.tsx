import { getButtonState } from '@/features/step-section/step-button/helpers';
import { StepButton } from '@/features/step-section/step-button/step-button';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';

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
      <div className='flex max-w-full flex-1 justify-center overflow-hidden'>
        <span>There are no steps for this round.</span>
      </div>
    );
  }

  return (
    <div className='flex max-w-full flex-1 justify-between overflow-hidden'>
      {props.steps.map((step) => {
        const buttonState = getButtonState(step, props.selectedStep);

        return (
          <StepButton
            state={buttonState}
            key={`${step.id}-${step.title}`}
            onClick={() => props.onSelectStep(step.id)}
            step={step}
            isAdmin={props.isAdmin}
            onDelete={props.onDeleteStep}
            onEdit={props.onEditStep}
          />
        );
      })}
    </div>
  );
}
