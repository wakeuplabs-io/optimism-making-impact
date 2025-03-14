import { CreateRoundModal } from '../create-round-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { RoundListButton } from './round-list-button';
import { RoundsService } from '@/services/rounds-service';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
import { useUserStore } from '@/state/user-store/user-store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function RoundList() {
  const { data: rounds = [], isLoading: roundsLoading } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (rounds.length === 0) {
    return null;
  }

  //const rounds = useSidebarStore((state) => state.rounds);
  const selectedRound = rounds[0];
  const setSelectedRound = useSidebarStore((state) => state.setSelectedRound);
  const addRound = useSidebarStore((state) => state.addRound);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  useEffect(() => {
    console.log('render');
  }, []);

  return (
    <SidebarSectionList
      id='rounds'
      isAdmin={isAdmin}
      title='Rounds'
      isLoading={roundsLoading}
      items={rounds.map((round) => {
        const isSelected = selectedRound?.id === round.id;
        return {
          id: round.id,
          item: <RoundListButton round={round} isSelected={isSelected} onSelect={(round) => setSelectedRound(round.id)} />,
        };
      })}
      addItem={<CreateRoundModal onSave={addRound} />}
      maxItems={5}
    />
  );
}
