import { cn } from '@/lib/utils';
import React from 'react';

interface HoverOverlayProps {
  children: React.ReactNode;
  overlayContent?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const HoverOverlay: React.FC<HoverOverlayProps> = ({ children, overlayContent, className, overlayClassName, disabled, onClick }) => {
  return (
    <div className={cn('group relative inline-block', className)}>
      {children}
      {!disabled && (
        <div
          className={cn(
            'absolute inset-0 z-50 hidden rounded-xl bg-black bg-opacity-50 group-hover:block',
            !!onClick && 'cursor-pointer',
            overlayClassName,
          )}
          onClick={onClick}
        >
          <div className={cn('flex h-full w-full items-center justify-center')}>{overlayContent}</div>
        </div>
      )}
    </div>
  );
};
