import { cn } from '@/lib/utils';
import { FormInputWrapper } from './form-input';
import { MultiSelectInput } from '../ui/multi-select';
import { Label } from '@radix-ui/react-label';

interface FormMultiSelectProps extends React.ComponentProps<typeof MultiSelectInput> {
  label?: string;
  error?: string;
}

export function FormMultiSelect({ label, error, className, ...props }: FormMultiSelectProps) {
  return (
    <FormInputWrapper error={error}>
      <div className='flex flex-col gap-1.5'>
        {label && (
          <Label htmlFor={label} className='text-xs text-[#BEBEBE] font-normal'>
            <span className='capitalize'>{label}</span>
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
