import { cn } from '@/lib/utils';
import { TextAreaInput, TextAreaInputModalProps } from '../text-area-input';
import { FormInputWrapper } from './form-input';
import { Label } from '@radix-ui/react-label';

export interface FormTextAreaProps extends TextAreaInputModalProps {
  label: string;
  error?: string;
  wrapperClassname?: string;
}

export function FormTextArea({ label, error, wrapperClassname, ...field }: FormTextAreaProps) {
  return (
    <FormInputWrapper error={error} className={wrapperClassname}>
      <div className='flex flex-col gap-1.5'>
        {label && (
          <Label htmlFor={field.name} className='text-xs text-[#BEBEBE] font-normal'>
            <span className='capitalize'>{label}</span>
          </Label>
        )}
        <TextAreaInput
          {...field}
          className={cn(
            {
              'border-red-500 focus-visible:ring-red-500': !!error,
            },
            field.className,
          )}
          id={field.name}
        />
      </div>
    </FormInputWrapper>
  );
}
