import { cn } from '@/lib/utils';
import React from 'react';

interface StepSeparatorProps {
  className?: string;
}

export const StepSeparator: React.FC<StepSeparatorProps> = ({ className }) => {
  return (
    // Width of the separator will be 8 dots. In this case 8 x 21px = 168px
    <div
      className={cn(
        className,
        'min-w-[21px] w-full lg:w-[168px] h-2 bg-step-separator bg-repeat-x bg-[length:21px_5px] bg-[position:0_center]',
      )}
    />
  );
};
