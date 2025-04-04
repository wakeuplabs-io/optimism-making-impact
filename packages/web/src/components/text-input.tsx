import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React from 'react';

export interface TextInputProps extends React.ComponentProps<'input'> {
  label?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ label, name, ...props }, ref) => {
  const finalLabel = label ?? name;

  return (
    <div className='flex flex-col gap-1.5'>
      {finalLabel && (
        <Label htmlFor={name} className='text-xs text-[#BEBEBE] font-normal'>
          <span className='capitalize'>{finalLabel}</span>
        </Label>
      )}
      <Input {...props} ref={ref} id={name} name={name} />
    </div>
  );
});

TextInput.displayName = 'TextInput';
