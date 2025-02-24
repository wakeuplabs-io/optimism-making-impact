import { cn } from '@/lib/utils';

type FormInputWrapperProps = {
  children: React.ReactNode;
  error?: string;
  className?: string;
};

export function FormInputWrapper(props: FormInputWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1', props.className)}>
      {props.children}
      {props.error && <span className='text-red-500 text-xs'>{props.error}</span>}
    </div>
  );
}
