import { cn } from '@/lib/utils';
import { LucideProps, PencilLine } from 'lucide-react';

interface EditIconProps extends Omit<LucideProps, 'ref'> {
  variant?: 'md' | 'lg';
}

export function EditIcon({ variant = 'md', className, ...props }: EditIconProps) {
  return (
    <PencilLine
      className={cn(
        'stroke-gray-700 hover:cursor-pointer hover:stroke-black',
        {
          'w-[20px] h-[20px]': variant === 'md',
          'w-[24px] h-[24px]': variant === 'lg',
        },
        className,
      )}
      {...props}
    />
  );
}
