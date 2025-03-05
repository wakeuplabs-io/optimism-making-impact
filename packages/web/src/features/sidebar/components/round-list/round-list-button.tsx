import { getRoundName } from '@/lib/utils';
import { CompleteRound } from '@/types';
import { Circle } from 'lucide-react';
import { SidebarListButton } from '../sidebar-list-button';

interface RoundListButtonProps {
  round: CompleteRound;
  isSelected: boolean;
  onSelect: (round: CompleteRound) => void;
}

export function RoundListButton({ round, isSelected, onSelect }: RoundListButtonProps) {
  return (
    <SidebarListButton isSelected={isSelected} onClick={() => onSelect(round)}>
      <>
        <div className='h-[20px] w-[20px] flex items-center justify-center'>
          <Circle className='h-[7px] w-[7px]' strokeWidth={6} />
        </div>
        <span className='truncate text-sm'>{getRoundName(round.id)}</span>
      </>
    </SidebarListButton>
  );
}
