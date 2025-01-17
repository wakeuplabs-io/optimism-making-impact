import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface HoverOverlayProps {
  children: React.ReactNode;
  overlayContent?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

export const HoverOverlay: React.FC<HoverOverlayProps> = ({ children, overlayContent, className, overlayClassName }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={cn('relative', className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && (
        <div className={cn('absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50', overlayClassName)}>
          <div className={cn('flex h-full w-full items-center justify-center')}>{overlayContent}</div>
        </div>
      )}
    </div>
  );
};
