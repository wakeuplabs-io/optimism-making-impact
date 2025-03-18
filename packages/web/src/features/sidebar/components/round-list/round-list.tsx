import { CreateRoundModal } from '../create-round-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { RoundListButton } from './round-list-button';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
import { useUserStore } from '@/state/user-store/user-store';
import { useState } from 'react';

export function RoundList() {
  const rounds = useSidebarStore((state) => state.rounds);
  const selectedRound = useSidebarStore((state) => state.selectedRound);
  const setSelectedRound = useSidebarStore((state) => state.setSelectedRound);
  const addRound = useSidebarStore((state) => state.addRound);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return (
    <SidebarSectionList
      id='rounds'
      isAdmin={isAdmin}
      title='Rounds'
      isLoading={isLoading}
      items={rounds.map((round) => {
        const isSelected = selectedRound?.id === round.id;
        return {
          id: round.id,
          item: <RoundListButton round={round} isSelected={isSelected} onSelect={(round) => setSelectedRound(round.id)} />,
        };
      })}
      addItem={<CreateRoundModal onSave={addRound} />}
      maxItems={3}
    />
  );
}
