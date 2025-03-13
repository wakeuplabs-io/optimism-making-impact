import { cn } from '@/lib/utils';

interface FormErrorMessageProps {
  error?: string;
  className?: string;
}

export function FormErrorMessage({ error, className }: FormErrorMessageProps) {
  return (
    <p
      className={cn(
        'text-xs text-red-500 min-h-[20px]',
        {
          // Error component will always be rendered, but invisible if no error.
          // This way we avoid the modal resizing when the error message is shown.
          invisible: !error,
        },
        className,
      )}
    >
      {error}
    </p>
  );
}
