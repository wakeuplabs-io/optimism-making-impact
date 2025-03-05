import { cn, getRoundName } from '@/lib/utils';
import { CompleteRound } from '@/types';
import { Circle } from 'lucide-react';

interface RoundListButtonProps {
  round: CompleteRound;
  isSelected: boolean;
  onSelect: (round: CompleteRound) => void;
}

export function RoundListButton({ round, isSelected, onSelect }: RoundListButtonProps) {
  return (
    <button
      className={cn(
        `group flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-secondary hover:bg-mi-stone-300 hover:text-dark-high [&_svg]:hover:text-primary transition-colors duration-200`,
        {
          'text-dark-high bg-mi-stone-300 [&_svg]:text-primary': isSelected,
        },
      )}
      onClick={() => onSelect(round)}
    >
      <div className='h-[20px] w-[20px] flex items-center justify-center'>
        <Circle className='h-[7px] w-[7px]' strokeWidth={6} />
      </div>
      <span className='truncate text-sm'>{getRoundName(round.id)}</span>
    </button>
  );
}
