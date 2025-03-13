import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { IconWithDefault } from '@/components/icon-with-default';
import { EditStepModal } from '@/features/step-section/edit-step-modal';
import { StepButtonState } from '@/features/step-section/step-button/helpers';
import { useIsMobile } from '@/hooks/use-tresholds';
import { cn } from '@/lib/utils';
import { Step } from '@/types/steps';
import { UpdateStepBody } from '@optimism-making-impact/schemas';
import { cva } from 'class-variance-authority';
import { useState } from 'react';

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
  const isActive = props.state === 'active';
  const showActionIcons = isActive && isAdmin && !isMobile;
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  return (
    <button
      {...props}
      className={cn(
        props.className,
        buttonVariants({ state: props.state }),
        'h-[70px] w-[70px] gap-3 rounded-full p-2 lg:h-[45px] lg:rounded-3xl lg:py-[12px] 2xl:px-[27px]',
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
        <div className='flex items-center justify-between w-full h-full'>
          <div
            className={cn('flex items-center justify-center gap-3', {
              'w-[90%]': showActionIcons,
              'w-full': !showActionIcons,
            })}
          >
            <div className='lg:min-w[22px]'>
              <IconWithDefault src={props.step.icon} />
            </div>
            {!isMobile && <div className='hidden text-left truncate text-4 2xl:inline-block'>{props.step.title}</div>}
          </div>
          {showActionIcons && (
            <div className={cn('ml-1')} onClick={(e) => e.stopPropagation()}>
              <EditStepModal step={props.step} onSave={onEdit} onDelete={() => setIsConfirmDeleteModalOpen(true)} />
            </div>
          )}
          {isConfirmDeleteModalOpen && (
            <DeleteConfirmationModal
              isOpen={isConfirmDeleteModalOpen}
              title='Delete step'
              description={`Are you sure you want to delete ${props.step.title} step?`}
              onOpenChange={(open) => setIsConfirmDeleteModalOpen(open)}
              onConfirm={() => onDelete?.(props.step.id)}
            />
          )}
        </div>
      )}
    </button>
  );
}
