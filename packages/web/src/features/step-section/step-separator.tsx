import { cn } from '@/lib/utils';
import React from 'react';

interface StepSeparatorProps {
  className?: string;
}

export const StepSeparator: React.FC<StepSeparatorProps> = ({ className }) => {
  return (
    <div className={cn(className, 'w-full min-w-[21px] h-2 bg-step-separator bg-repeat-x bg-[length:21px_5px] bg-[position:0_center]')} />
  );
};
