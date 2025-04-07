import { FormErrorMessage } from './form-error-message';
import { cn } from '@/lib/utils';

type FormInputWrapperProps = {
  children: React.ReactNode;
  error?: string;
  className?: string;
  hideError?: boolean;
};

export function FormInputWrapper(props: FormInputWrapperProps) {
  return (
    <div className={cn('flex flex-col gap-1', props.className)}>
      {props.children}
      {!props.hideError && <FormErrorMessage error={props.error} />}
    </div>
  );
}
