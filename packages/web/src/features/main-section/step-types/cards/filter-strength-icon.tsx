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

  switch (strength) {
    case 'LOW':
      return <FilterGroupIcon selected={selected} color={color} icon={ArrowDownRight} />;
    case 'MEDIUM':
      return <FilterGroupIcon selected={selected} color={color} icon={ArrowRight} />;
    case 'HIGH':
      return <FilterGroupIcon selected={selected} color={color} icon={ArrowUpRight} />;
    default:
      return null;
  }
}
