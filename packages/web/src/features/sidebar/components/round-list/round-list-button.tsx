import { SidebarListButton } from '../sidebar-list-button';
import { getRoundName } from '@/lib/utils';
import { CompleteRound } from '@/types/rounds';
import { Circle } from 'lucide-react';

interface RoundListButtonProps {
  round: CompleteRound;
  isSelected: boolean;
  onSelect: (round: CompleteRound) => void;
}

export function RoundListButton({ round, isSelected, onSelect }: RoundListButtonProps) {
  return (
    <SidebarListButton isSelected={isSelected} isLoading={round.status === 'PENDING'} onClick={() => onSelect(round)}>
      <div className='flex gap-4'>
        <div className='flex h-[20px] w-[20px] items-center justify-center'>
          <Circle className='h-[7px] w-[7px]' strokeWidth={6} />
        </div>
        <span className='text-sm truncate'>{getRoundName(round.id)}</span>
      </div>
    </SidebarListButton>
  );
}
