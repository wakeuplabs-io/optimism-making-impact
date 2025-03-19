import { ExtendedColor } from '@/config';
import { cn, getColor } from '@/lib/utils';
export interface ColorDotProps {
  color: ExtendedColor;
  className?: string;
}

export function ColorDot(props: ColorDotProps) {
  const color = getColor(props.color);

  return <div className={cn('h-2 w-2 shrink-0 rounded-full', props.className)} style={{ backgroundColor: color }} />;
}
