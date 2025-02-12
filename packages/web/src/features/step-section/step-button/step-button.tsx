import { IconWithDefault } from '@/components/icon-with-default';
import { EditStepModal } from '@/features/step-section/edit-step-modal';
import { StepButtonState } from '@/features/step-section/step-button/helpers';
import { useIsMobile } from '@/hooks/use-tresholds';
import { cn } from '@/lib/utils';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { DeleteStepConfirmationModal } from '../delete-step-confirmation-modal';

interface StepButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  state: StepButtonState;
  step: Step;
  isAdmin?: boolean;
  onDelete?: (stepId: number) => void;
  onEdit?: (stepId: number, data: UpdateStepBody) => void;
}

const buttonVariants = cva('flex overflow-hidden whitespace-nowrap rounded-3xl border transition-all ease-in-out duration-500', {
  variants: {
    state: {
      past: 'border-white-low text-white-low bg-[#F1F4F9] hover:bg-primary hover:text-white',
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
        props.className,
        buttonVariants({ state: props.state }),
        'w-[70px] h-[70px] p-2 rounded-full gap-3 lg:h-[45px] lg:rounded-3xl  lg:py-[12px] 2xl:px-[27px] ',
        {
          'lg:w-[45px] lg:px-[10px] lg:py-0': !showActionIcons || isMobile,
          'lg:w-[80px] lg:px-[12px]': showActionIcons,
        },
      )}
    >
      {isMobile ? (
        <div className='flex items-center justify-center w-full h-full'>
          <IconWithDefault src={props.step.icon} size='lg' />
        </div>
      ) : (
        <div className='w-full flex justify-between items-center'>
          <div
            className={cn('flex items-center justify-center gap-3', {
              'w-[90%]': showActionIcons,
              'w-full': !showActionIcons,
            })}
          >
            <div className='lg:min-w[22px]'>
              <IconWithDefault src={props.step.icon} />
            </div>
            {!isMobile && <div className='text-left truncate text-4 hidden 2xl:inline-block'>{props.step.title}</div>}
          </div>
          {showActionIcons && (
            <div className={cn('ml-1')} onClick={(e) => e.stopPropagation()}>
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
        </div>
      )}
    </button>
  );
}
