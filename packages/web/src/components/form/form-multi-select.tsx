import { MultiSelectInput } from '../ui/multi-select';
import { FormInputWrapper } from './form-input';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface FormMultiSelectProps extends React.ComponentProps<typeof MultiSelectInput> {
  label?: string;
  error?: string;
}

export function FormMultiSelect({ label, error, className, ...props }: FormMultiSelectProps) {
  const multiSelectLabel = label ?? props.name;
  return (
    <FormInputWrapper error={error}>
      <div className='flex flex-col gap-1.5'>
        {multiSelectLabel && (
          <Label htmlFor={props.name} className='text-xs text-[#BEBEBE] font-normal'>
            <span className='capitalize'>{multiSelectLabel}</span>
          </Label>
        )}
        <MultiSelectInput
          className={cn(
            {
              'border-red-500 focus-within:ring-red-500': !!error,
            },
            className,
          )}
          {...props}
        />
      </div>
    </FormInputWrapper>
  );
}
