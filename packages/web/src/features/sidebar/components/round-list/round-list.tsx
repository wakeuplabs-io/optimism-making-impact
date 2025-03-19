// round-list.tsx
import { useRounds } from '@/hooks/use-rounds';
import { CreateRoundModal } from '../create-round-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { RoundListButton } from './round-list-button';
import { useUser } from '@/hooks/use-user';

export function RoundList() {
  const { isAdminModeEnabled: isAdmin } = useUser();
  const { rounds, selectedRound, roundsLoading, handleRoundSelect, handleRoundAdd } = useRounds();

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
          item: <RoundListButton round={round} isSelected={isSelected} onSelect={handleRoundSelect} />,
        };
      })}
      addItem={<CreateRoundModal onSave={handleRoundAdd} />}
      maxItems={3}
    />
  );
}
