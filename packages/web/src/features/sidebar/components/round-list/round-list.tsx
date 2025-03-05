import { useSidebarStore, useUserStore } from '@/state';
import { cn } from '@/lib/utils';
import { RoundListButton } from './round-list-button';
import { CreateRoundModal } from '../create-round-modal';

interface RoundListProps {
  className?: string;
}

export function RoundList({ className }: RoundListProps) {
  const rounds = useSidebarStore((state) => state.rounds);
  const selectedRound = useSidebarStore((state) => state.selectedRound);
  const setSelectedRound = useSidebarStore((state) => state.setSelectedRound);
  const addRound = useSidebarStore((state) => state.addRound);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <p className='text-xs font-normal text-gray-700'>Rounds</p>
      <ul className='flex flex-col gap-2'>
        {rounds.map((round) => {
          const isSelected = selectedRound?.id === round.id;
          return (
            <li key={round.id}>
              <RoundListButton round={round} isSelected={isSelected} onSelect={(round) => setSelectedRound(round.id)} />
            </li>
          );
        })}
        {isAdmin && (
          <li key='add-round-button'>
            <CreateRoundModal onSave={addRound} />
          </li>
        )}
      </ul>
    </div>
  );
}
