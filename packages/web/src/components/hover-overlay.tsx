import { cn } from '@/lib/utils';
import React from 'react';

interface HoverOverlayProps {
  children: React.ReactNode;
  overlayContent?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  disabled?: boolean;
}

export const HoverOverlay: React.FC<HoverOverlayProps> = ({ children, overlayContent, className, overlayClassName, disabled }) => {
  return (
    <div className={cn('group relative inline-block', className)}>
      {children}
      {!disabled && (
        <div className={cn('absolute inset-0 z-50 hidden rounded-xl bg-black bg-opacity-50 group-hover:block', overlayClassName)}>
          <div className={cn('flex h-full w-full items-center justify-center')}>{overlayContent}</div>
        </div>
      )}
    </div>
  );
};
