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
        props.className,
        buttonVariants({ state: props.state }),
        // 'h-[45px] px-[12px] lg:py-[12px] 2xl:w-[220px] 2xl:px-[27px] gap-3 ',
        'w-[100px] h-[45px] px-[12px] lg:py-[12px] 2xl:px-[27px] gap-3',
        {
          'lg:w-[45px] px-[10px] py-0 ': !showActionIcons || isMobile,
          'lg:w-[80px] px-[12px]': showActionIcons,
        },
      )}
    >
      <div className='w-full flex items-center justify-center'>
        <div
          className={cn('flex gap-3', {
            'w-[90%]': showActionIcons,
          })}
        >
          <div className='min-w[22px]'>
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
    </button>
  );
}
