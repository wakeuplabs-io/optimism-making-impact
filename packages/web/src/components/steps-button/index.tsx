import { StepButtonProps, StepButtonState } from '@/components/steps-button/types';
import { cn } from '@/lib/utils';

export function StepButton({ children, ...props }: StepButtonProps) {
  return (
    <button
      {...props}
      disabled={props.state === 'active'}
      className={cn('flex h-[45px] items-center truncate rounded-3xl border px-[27px] py-[12px]', buttonVariants[props.state])}
    >
      {children}
    </button>
  );
}

const buttonVariants: Record<StepButtonState, string> = {
  past: 'border-white-low text-white-low hover:bg-primary hover:text-white transition-all ease-in-out duration-500',
  active: 'border-primary',
  coming: 'border-secondary hover:bg-primary hover:text-white transition-all ease-in-out duration-500',
};
