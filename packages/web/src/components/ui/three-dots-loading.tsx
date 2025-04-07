import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const threeDotsLoadingVariants = cva('rounded-full animate-bounce', {
  variants: {
    size: {
      xs: 'w-1 h-1',
      sm: 'w-2 h-2',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
    color: {
      white: 'bg-white-high',
      black: 'bg-black-high',
      secondary: 'bg-secondary',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'white',
  },
});

interface ThreeDotsLoadingProps extends VariantProps<typeof threeDotsLoadingVariants> {
  className?: string;
}

export const ThreeDotsLoading: React.FC<ThreeDotsLoadingProps> = ({ size, color, className }) => {
  const variant = threeDotsLoadingVariants({ size, color });

  return (
    <div className={cn('flex space-x-1 items-center', className)}>
      <div className={variant} />
      <div className={cn(variant, 'delay-150')} />
      <div className={cn(variant, 'delay-300')} />
    </div>
  );
};
