import { cn } from '@/lib/utils';

interface FormErrorMessageProps {
  error: string;
  className?: string;
}

export function FormErrorMessage({ error, className }: FormErrorMessageProps) {
  return (
    <p
      className={cn('text-xs text-red-500 min-h-[20px]', {
        className,
      })}
    >
      {error || ' '}
    </p>
  );
}
