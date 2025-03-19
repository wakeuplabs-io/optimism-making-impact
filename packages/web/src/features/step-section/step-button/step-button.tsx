import { IconWithDefault } from '@/components/icon-with-default';
import { EditStepModal } from '@/features/step-section/edit-step-modal';
import { StepButtonState } from '@/features/step-section/step-button/helpers';
import { useIsMobile } from '@/hooks/use-tresholds';
import { cn } from '@/lib/utils';
import { Step } from '@/types/steps';
import { UpdateStepBody } from '@optimism-making-impact/schemas';
import { cva } from 'class-variance-authority';

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
      past: 'border-mi-gray-200 text-gray-700 bg-[#F1F4F9] hover:bg-primary hover:text-white',
      active: 'border-primary bg-white [&_svg]:text-primary',
      coming: 'border-mi-gray-600 hover:bg-primary hover:text-white',
    },
  },
});

export function StepButton({ isAdmin, onEdit, onDelete, ...props }: StepButtonProps) {
  const isMobile = useIsMobile();
  const isActive = props.state === 'active';
  const showActionIcons = isActive && isAdmin && !isMobile;

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
          <IconWithDefault src={props.step.icon} size='xl' />
        </div>
      ) : (
        <div className='flex items-center justify-between w-full h-full gap-2'>
          <div
            className={cn('flex items-center justify-center gap-3', {
              'w-[85%]': showActionIcons,
              'w-full': !showActionIcons,
            })}
          >
            <div className='lg:min-w[22px]'>
              <IconWithDefault src={props.step.icon} />
            </div>
            {!isMobile && <div className='hidden text-left truncate text-base 2xl:inline-block'>{props.step.title}</div>}
          </div>
          {showActionIcons && (
            <div className={cn('h-full')} onClick={(e) => e.stopPropagation()}>
              <EditStepModal step={props.step} onSave={onEdit} onDelete={() => onDelete?.(props.step.id)} />
            </div>
          )}
        </div>
      )}
    </button>
  );
}
