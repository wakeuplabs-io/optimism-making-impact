import { IconWithDefault } from '@/components/icon-with-default';
import { EditStepModal } from '@/features/step-section/edit-step-modal';
import { StepButtonState } from '@/features/step-section/step-button/helpers';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { DeleteStepConfirmationModal } from '../delete-step-confirmation-modal';

interface StepButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  state: StepButtonState;
  isAdmin?: boolean;
  step: Step;
  onDelete?: (stepId: number) => void;
  onEdit?: (stepId: number, data: UpdateStepBody) => void;
}

const buttonVariants = cva('flex overflow-hidden whitespace-nowrap rounded-3xl border transition-all ease-in-out duration-500', {
  variants: {
    state: {
      past: 'border-white-low text-white-low hover:bg-primary hover:text-white',
      active: 'border-primary bg-white',
      coming: 'border-secondary hover:bg-primary hover:text-white',
    },
  },
});

export function StepButton({ isAdmin, onEdit, onDelete, ...props }: StepButtonProps) {
  const isMobile = useIsMobile();
  const showActionIcons = isAdmin && !isMobile;
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ state: props.state }),
        ' h-[45px] justify-center items-center lg:justify-start lg:py-[12px] 2xl:px-[27px] 2xl:min-w-[250px] 2xl:max-w-[500px] gap-3 ',
        {
          'w-[80px] px-[10px] py-0 ': !showActionIcons || isMobile,
          'w-[150px] px-[12px]': showActionIcons,
        },
      )}
    >
      <IconWithDefault src={props.step.icon} />

      {!isMobile && <div className='text-left truncate text-4 hidden 2xl:inline-block '>{props.step.title}</div>}

      {showActionIcons && (
        <div className='ml-1' onClick={(e) => e.stopPropagation()}>
          <EditStepModal step={props.step} onClick={onEdit} onDelete={() => setIsConfirmDeleteModalOpen(true)} />
        </div>
      )}
      {isConfirmDeleteModalOpen && (
        <DeleteStepConfirmationModal
          isOpen={isConfirmDeleteModalOpen}
          onOpenChange={(open) => setIsConfirmDeleteModalOpen(open)}
          step={props.step}
          onClick={onDelete}
        />
      )}
    </button>
  );
}
