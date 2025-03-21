import { toast } from '@/hooks/use-toast';
import { RoundsContext } from './rounds-context';
import { queryClient } from '@/main';
import { router } from '@/router';
import { RoundsService } from '@/services/rounds-service';
import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';
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
    onSuccess: (data) => {
      setRoundIdQueryParam(data.id);
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['rounds'] });

      const previousRounds = queryClient.getQueryData<CompleteRound[]>(['rounds']);

      if (!previousRounds) throw new Error('add round - round not found');

      const lastRound = previousRounds[0];
      const newRound: CompleteRound = {
        id: lastRound.id + 1,
        link1: '',
        link2: '',
        status: 'PENDING',
        categories: [],
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
