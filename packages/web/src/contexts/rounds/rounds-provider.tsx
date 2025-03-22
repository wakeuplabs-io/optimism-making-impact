import { RoundsContext } from './rounds-context';
import { useQueryParams } from '@/hooks/use-query-params';
import { queryClient } from '@/main';
import { RoundsService } from '@/services/rounds-service';
import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';

export const RoundsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRound, setSelectedRound] = useState<CompleteRound>();
  const { setSelectedRoundId, selectedRoundId } = useQueryParams();

  const { data: rounds = [], isLoading: roundsLoading } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  // Add round mutation
  const addRound = useMutation({
    mutationFn: () => RoundsService.createRound(),
    onSuccess: (data) => {
      setSelectedRoundId(data.id);
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

  function handleRoundSelect(round: CompleteRound) {
    setSelectedRound(round);
    setSelectedRoundId(round.id);
  }

  // Set default round when rounds load
  useEffect(() => {
    if (rounds.length === 0) {
      return;
    }
    const newRound = rounds.find((r) => r.id === selectedRoundId);
    handleRoundSelect(newRound ?? rounds[0]);
  }, [rounds]);

  return (
    <RoundsContext.Provider value={{ rounds, roundsLoading, selectedRound, handleRoundAdd, handleRoundSelect, editRound }}>
      {children}
    </RoundsContext.Provider>
  );
};
