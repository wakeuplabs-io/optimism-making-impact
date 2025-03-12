import { cn } from '@/lib/utils';
import { FormErrorMessage } from './form-error-message';

type FormInputWrapperProps = {
  children: React.ReactNode;
  error?: string;
  className?: string;
};

export function FormInputWrapper(props: FormInputWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1', props.className)}>
      {props.children}
      <FormErrorMessage
        error={props.error}
        className={cn({
          invisible: !props.error,
        })}
      />
    </div>
  );
}
