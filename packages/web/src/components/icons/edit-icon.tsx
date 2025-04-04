import { cn } from '@/lib/utils';
import { LucideProps, PencilLine } from 'lucide-react';
import React from 'react';

interface EditIconProps extends Omit<LucideProps, 'ref'> {
  variant?: 'md' | 'lg';
}

export const EditIcon = React.forwardRef<SVGSVGElement, EditIconProps>(({ variant = 'md', className, ...props }, ref) => {
  return (
    <PencilLine
      ref={ref}
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
});

EditIcon.displayName = 'EditIcon';
