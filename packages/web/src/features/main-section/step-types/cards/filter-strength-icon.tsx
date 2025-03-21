import { BaseFilterGroupIconProps, FilterGroupIcon } from '@/components/filter-group/filter-group-icon';
import { CardStrength } from '@optimism-making-impact/schemas';
import { CARD_STRENGTH_COLOR_MAP } from '@/config';
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';

interface FilterStrengthIconProps extends BaseFilterGroupIconProps {
  selected: boolean;
  strength: CardStrength;
}

export function FilterStrengthIcon({ selected, strength }: FilterStrengthIconProps) {
  const { color } = CARD_STRENGTH_COLOR_MAP[strength];

  let icon = ArrowDownRight

  switch (strength) {
    case 'LOW':
      icon = ArrowDownRight
      break;
    case 'MEDIUM':
      icon = ArrowRight
      break;
    case 'HIGH':
      icon = ArrowUpRight
      break;
  }

  return <FilterGroupIcon selected={selected} color={color} icon={icon} />
}
