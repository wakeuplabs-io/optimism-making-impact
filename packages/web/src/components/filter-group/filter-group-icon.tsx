import { LucideIcon, LucideProps } from 'lucide-react';
import { ColorDot, ColorDotProps } from '../color-dot';
import { cn, getColor } from '@/lib/utils';

export interface BaseFilterGroupIconProps {
  selected: boolean;
}

export interface FilterGroupColorDotProps extends BaseFilterGroupIconProps, ColorDotProps {}

export function FilterGroupColorDot({ selected, color, ...props }: FilterGroupColorDotProps) {
  return <ColorDot color={selected ? color : 'GRAY'} {...props} />;
}

export interface FilterGroupIconProps extends BaseFilterGroupIconProps, LucideProps {
  icon: LucideIcon;
}

export function FilterGroupIcon({ selected, color, icon: Icon, className, ...props }: FilterGroupIconProps) {
  return <Icon color={selected ? color : getColor('GRAY')} className={cn('h-4 w-4', className)} {...props} />;
}
