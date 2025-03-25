import { RoundsContext } from './rounds-context';
import { useQueryParams } from '@/hooks/use-query-params';
import { toast } from '@/hooks/use-toast';
import { queryClient } from '@/main';
import { RoundsService } from '@/services/rounds-service';
import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['rounds'] });

      const previousRounds = queryClient.getQueryData<CompleteRound[]>(['rounds']);

      if (!previousRounds) throw new Error('add round - round not found');

      const lastRound = previousRounds[0];
      const newRound: CompleteRound = {
        id: lastRound.id + 1,
        link1: lastRound.link1,
        link2: lastRound.link2,
        status: 'PENDING',
        categories: lastRound.categories.map((cat, idx) => ({
          ...cat,
          id: idx,
        })),
      };

      queryClient.setQueryData(['rounds'], [newRound, ...previousRounds]);
      return { previousRounds };
    },
    onError: (error, _, context) => {
      if (context?.previousRounds) {
        queryClient.setQueryData(['rounds'], context?.previousRounds);
      }

      let description = 'Failed to create Round';
      if (error instanceof AxiosError) {
        description = error.response?.data.error.message;
      }

      toast({ title: 'Failed to create Round', description, variant: 'destructive' });
    },
  });

  const { mutate: editRound } = useMutation({
    mutationFn: (props: { roundId: number; data: UpdateRoundBody }) => RoundsService.editOne(props.roundId, props.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
    onMutate: async (props) => {
      await queryClient.cancelQueries({ queryKey: ['rounds'] });

      const previousRounds = queryClient.getQueryData<CompleteRound[]>(['rounds']);

      if (!previousRounds) throw new Error('edit round - rounds not found');

      queryClient.setQueryData(
        ['rounds'],
        previousRounds.map((round) => (round.id === props.roundId ? { ...round, ...props.data } : round)),
      );

      return { previousRounds };
    },
    onError: (error, _, context) => {
      if (context?.previousRounds) {
        queryClient.setQueryData(['rounds'], context.previousRounds);
      }

      let description = 'Failed to update Round';
      if (error instanceof AxiosError) {
        description = error.response?.data.error.message;
      }

      toast({ title: 'Failed to update Round', description, variant: 'destructive' });
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
