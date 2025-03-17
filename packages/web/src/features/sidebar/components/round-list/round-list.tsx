// round-list.tsx
import { CreateRoundModal } from '../create-round-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { RoundListButton } from './round-list-button';
import { useRoundList } from '@/hooks/use-round-list';

export function RoundList() {
  const { rounds, selectedRound, isAdmin, roundsLoading, handleRoundSelect, handleRoundAdd } = useRoundList();

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
      maxItems={5}
    />
  );
}
