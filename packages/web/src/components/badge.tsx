import { BADGE_COLORS } from '@/config';
import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
}

export function Badge({ backgroundColor = BADGE_COLORS[0], ...props }: BadgeProps) {
  return (
    <div className={cn('inline-block rounded-full px-6 py-1', props.className)} style={{ backgroundColor }}>
      {props.children}
    </div>
  );
}
