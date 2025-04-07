import { TextInput } from '../text-input';
import { FormInputWrapper } from './form-input';
import { cn } from '@/lib/utils';
import React from 'react';

interface FormTextInputProps extends React.ComponentProps<typeof TextInput> {
  error?: string;
  wrapperClassname?: string;
  hideError?: boolean;
}

export const FormTextInput = React.forwardRef<HTMLInputElement, FormTextInputProps>(
  ({ error, wrapperClassname, hideError, ...field }, ref) => {
    return (
      <FormInputWrapper error={error} className={wrapperClassname} hideError={hideError}>
        <TextInput
          {...field}
          ref={ref}
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
  },
);

FormTextInput.displayName = 'FormTextInput';
