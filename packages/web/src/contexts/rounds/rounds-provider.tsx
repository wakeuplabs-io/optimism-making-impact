import { RoundsContext } from './rounds-context';
import { queryClient } from '@/main';
import { router } from '@/router';
import { RoundsService } from '@/services/rounds-service';
import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { ReactNode, useEffect, useState } from 'react';

export const RoundsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRound, setSelectedRound] = useState<CompleteRound>();

  const { data: rounds = [], isLoading: roundsLoading } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const search = useSearch({ from: '/' });

  // Add round mutation
  const addRound = useMutation({
    mutationFn: () => RoundsService.createRound(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
  });
  const { mutate: editRound } = useMutation({
    mutationFn: (props: { roundId: number; data: UpdateRoundBody }) => RoundsService.editOne(props.roundId, props.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
  });

  const handleRoundAdd = () => {
    addRound.mutate();
  };

  // Set round ID in URL query params
  const setRoundIdQueryParam = (roundId: number) => {
    router.navigate({
      search: (prev) => ({ ...prev, roundId }),
      reloadDocument: false,
      to: '/',
    });
  };

  // Update URL when selected round changes
  useEffect(() => {
    if (selectedRound) {
      setRoundIdQueryParam(selectedRound.id);
    }
  }, [selectedRound]);

  // Set default round when rounds load
  useEffect(() => {
    if (rounds.length === 0) {
      return;
    }
    const newRound = rounds.find((r) => r.id === search.roundId);
    setSelectedRound(newRound ?? rounds[0]);
  }, [rounds]);

  return (
    <RoundsContext.Provider
      value={{ rounds, roundsLoading, selectedRound, handleRoundAdd, handleRoundSelect: setSelectedRound, editRound }}
    >
      {children}
    </RoundsContext.Provider>
  );
};
