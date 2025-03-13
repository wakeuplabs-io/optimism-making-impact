import { cn } from '@/lib/utils';
import { TextAreaInput } from '../text-area-input';
import { FormInputWrapper } from './form-input';

export interface FormTextAreaProps extends React.ComponentProps<typeof TextAreaInput> {
  error?: string;
  wrapperClassname?: string;
}

export function FormTextArea({ error, wrapperClassname, ...field }: FormTextAreaProps) {
  return (
    <FormInputWrapper error={error} className={wrapperClassname}>
      <TextAreaInput
        {...field}
        className={cn(
          {
            'border-red-500 focus-visible:ring-red-500': !!error,
          },
          field.className,
        )}
      />
    </FormInputWrapper>
  );
}
