import { CreateRoundModal } from '../create-round-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { RoundListButton } from './round-list-button';
import { queryClient } from '@/main';
import { router } from '@/router';
import { RoundsService } from '@/services/rounds-service';
import { useUserStore } from '@/state/user-store/user-store';
import { CompleteRound } from '@/types/rounds';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function RoundList() {
  const { data: rounds = [], isLoading: roundsLoading } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const search = useSearch({ from: '/' });

  const [selectedRound, setSelectedRound] = useState<CompleteRound | null>();

  const setRoundIdQueryParam = (roundId: number) => {
    router.navigate({ search: { ...search, roundId }, reloadDocument: false, to: '/' });
  };
  const addRound = useMutation({
    mutationFn: () => RoundsService.createRound(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
  });
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  useEffect(() => {
    if (rounds.length === 0) {
      return;
    }
    const defaultRound = rounds[0];
    setSelectedRound(defaultRound);
  }, [rounds]);

  useEffect(() => {
    if (selectedRound) {
      setRoundIdQueryParam(selectedRound.id);
    }
  }, [selectedRound]);

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
          item: <RoundListButton round={round} isSelected={isSelected} onSelect={(round) => setSelectedRound(round)} />,
        };
      })}
      addItem={<CreateRoundModal onSave={addRound.mutate} />}
      maxItems={5}
    />
  );
}
