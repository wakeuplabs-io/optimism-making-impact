import { ColorDot, ColorDotProps } from '../color-dot';

interface FilterGroupIconProps {
  selected: boolean;
}

export function FilterGroupColorDot({ selected, color, ...props }: FilterGroupIconProps & ColorDotProps) {
  return <ColorDot color={selected ? color : 'GRAY'} {...props} />;
}
