import { cn, getColor } from '@/lib/utils';
import { Color } from '@/types';

interface ColorDotProps {
  color: Color;
  className?: string;
}

export function ColorDot(props: ColorDotProps) {
  const color = getColor(props.color);

  return <div className={cn('h-2 w-2 rounded-full', props.className)} style={{ backgroundColor: color }} />;
}
