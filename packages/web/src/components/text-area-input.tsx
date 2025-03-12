import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { forwardRef } from 'react';

interface TextAreaInputModalProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputModalProps>((props, ref) => {
  const { name } = props;

  return (
    <>
      <Label htmlFor={name} className='sr-only'>
        <span>{name}</span>
      </Label>
      <textarea
        ref={ref}
        className={cn(
          'max-w-screen w-full items-center overflow-auto break-words rounded border border-input bg-inherit p-2 text-sm',
          props.className,
        )}
        {...props}
      />
    </>
  );
});
