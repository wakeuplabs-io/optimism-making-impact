import { cn, getRoundName } from '@/lib/utils';
import { CompleteRound } from '@/types';

interface RoundListButtonProps {
  round: CompleteRound;
  isSelected: boolean;
  onSelect: (round: CompleteRound) => void;
}

export function RoundListButton({ round, isSelected, onSelect }: RoundListButtonProps) {
  return (
    <button
      className={cn(
        `group flex w-full items-center gap-2 rounded-[10px] px-4 py-2 text-secondary hover:bg-mi-stone-300 hover:text-dark-high`,
        {
          'text-dark-high bg-mi-stone-300': isSelected,
        },
      )}
      onClick={() => onSelect(round)}
    >
      <div className='h-[22px] w-[22px]'></div>
      <span className='truncate text-sm'>{getRoundName(round.id)}</span>
    </button>
  );
}
