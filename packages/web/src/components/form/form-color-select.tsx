import { ColorSelectInput, ColorSelectInputProps } from '../inputs/color-select-input';
import { FormInputWrapper } from './form-input';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface FormColorSelectProps extends ColorSelectInputProps {
  label?: string;
  error?: string;
}

export function FormColorSelect({ error, label, containerClassName, ...field }: FormColorSelectProps) {
  return (
    <FormInputWrapper error={error}>
      {label && (
        <Label htmlFor={label} className='text-xs text-[#BEBEBE] font-normal'>
          <span className='capitalize'>{label}</span>
        </Label>
      )}
      <ColorSelectInput
        {...field}
        containerClassName={cn(
          {
            'border-red-500 focus-visible:ring-red-500': !!error,
          },
          containerClassName,
        )}
      />
    </FormInputWrapper>
  );
}
