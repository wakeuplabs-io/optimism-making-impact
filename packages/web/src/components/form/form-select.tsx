import { SelectInput } from '../inputs/select-input';
import { FormInputWrapper } from './form-input';
import { cn } from '@/lib/utils';

interface FormSelectProps extends React.ComponentProps<typeof SelectInput> {
  error?: string;
}

export function FormSelect({ error, triggerClassName, ...props }: FormSelectProps) {
  return (
    <FormInputWrapper error={error}>
      <SelectInput
        triggerClassName={cn(
          {
            'border-red-500 focus-visible:ring-red-500': !!error,
          },
          triggerClassName,
        )}
        {...props}
      />
    </FormInputWrapper>
  );
}
