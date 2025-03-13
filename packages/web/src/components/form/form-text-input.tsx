import { cn } from '@/lib/utils';
import { TextInput } from '../text-input';
import { FormInputWrapper } from './form-input';

interface FormTextInputProps extends React.ComponentProps<typeof TextInput> {
  error?: string;
  wrapperClassname?: string;
}

export function FormTextInput({ error, wrapperClassname, ...field }: FormTextInputProps) {
  return (
    <FormInputWrapper error={error} className={wrapperClassname}>
      <TextInput
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
