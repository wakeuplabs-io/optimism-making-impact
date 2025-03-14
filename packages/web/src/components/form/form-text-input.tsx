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
          'h-[42px] w-full rounded-md border border-gray-300 px-3 text-sm',
          {
            'border-red-500 focus-visible:ring-red-500': !!error,
          },
          field.className,
        )}
      />
    </FormInputWrapper>
  );
}
