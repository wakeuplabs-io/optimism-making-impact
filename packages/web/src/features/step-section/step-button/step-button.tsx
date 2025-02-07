import { IconWithDefault } from '@/components/icon-with-default';
import { DeleteStepModal } from '@/features/step-section/delete-step-modal';
import { EditStepModal } from '@/features/step-section/edit-step-modal';
import { StepButtonState } from '@/features/step-section/step-button/helpers';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { cva } from 'class-variance-authority';

interface StepButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  state: StepButtonState;
  isAdmin?: boolean;
  step: Step;
  onDelete?: (stepId: number) => void;
  onEdit?: (stepId: number, data: UpdateStepBody) => void;
}

const buttonVariants = cva(
  'flex h-[45px] max-w-[300px] items-center overflow-hidden whitespace-nowrap rounded-3xl border px-[27px] py-[12px] transition-all ease-in-out duration-500',
  {
    variants: {
      state: {
        past: 'border-white-low text-white-low hover:bg-primary hover:text-white',
        active: 'border-primary bg-white',
        coming: 'border-secondary hover:bg-primary hover:text-white',
      },
      isMobile: {
        true: 'w-[45px] justify-center p-5 px-0 py-0',
        false: '',
      },
    },
  },
);

export function StepButton({ isAdmin, onEdit, onDelete, ...props }: StepButtonProps) {
  const isMobile = useIsMobile();
  const showActionIcons = isAdmin && !isMobile;

  return (
    <button {...props} className={cn(buttonVariants({ state: props.state, isMobile }))}>
      <div className='flex items-center max-w-full gap-2'>
        <div>
          <IconWithDefault src={props.step.icon} />
        </div>

        {!isMobile && <div className='flex-1 text-left truncate'>{props.step.title}</div>}

        {showActionIcons && (
          <div className='flex gap-4 ml-1' onClick={(e) => e.stopPropagation()}>
            <DeleteStepModal step={props.step} onClick={onDelete} />
            <EditStepModal step={props.step} onClick={onEdit} />
          </div>
        )}
      </div>
    </button>
  );
}
