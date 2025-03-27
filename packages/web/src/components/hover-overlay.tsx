import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface HoverOverlayProps {
  children: React.ReactNode;
  overlayContent?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  disabled?: boolean;
}

export const HoverOverlay: React.FC<HoverOverlayProps> = ({ children, overlayContent, className, overlayClassName, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && !disabled && (
        <div className={cn('absolute inset-0 z-50 rounded-xl bg-black bg-opacity-50', overlayClassName)}>
          <div className={cn('flex h-full w-full items-center justify-center')}>{overlayContent}</div>
        </div>
      )}
    </div>
  );
};
