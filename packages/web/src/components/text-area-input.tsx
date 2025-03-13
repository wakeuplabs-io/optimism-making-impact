import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { forwardRef } from 'react';

interface TextAreaInputModalProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputModalProps>(({ name, className, ...props }, ref) => {
  return (
    <>
      <Label htmlFor={name} className='sr-only'>
        <span>{name}</span>
      </Label>
      <textarea
        ref={ref}
        className={cn(
          'max-w-screen w-full items-center overflow-auto break-words rounded border border-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-inherit p-2 text-sm',
          className,
        )}
        {...props}
      />
    </>
  );
});
