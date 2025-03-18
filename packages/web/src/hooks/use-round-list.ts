import { useUser } from '@/hooks/use-user';
import { queryClient } from '@/main';
import { router } from '@/router';
import { RoundsService } from '@/services/rounds-service';
import { CompleteRound } from '@/types/rounds';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';

export function useRoundList() {
  const [selectedRound, setSelectedRound] = useState<CompleteRound | null>(null);
  const { isAdminModeEnabled: isAdmin } = useUser();
  const search = useSearch({ from: '/' });

  // Fetch rounds data
  const { data: rounds = [], isLoading: roundsLoading } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  // Add round mutation
  const addRound = useMutation({
    mutationFn: () => RoundsService.createRound(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
  });

  const updateRound = useMutation({
    mutationFn: (data: Partial<CompleteRound>) => {
      const { id, link1, link2 } = data;
      return RoundsService.editOne(id as number, {
        link1: link1 ?? undefined,
        link2: link2 ?? undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
  });

  // Set round ID in URL query params
  const setRoundIdQueryParam = useCallback(
    (roundId: number) => {
      router.navigate({
        search: { ...search, roundId },
        reloadDocument: false,
        to: '/',
      });
    },
    [search],
  );

  // Set default round when rounds load
  useEffect(() => {
    if (rounds.length === 0) {
      return;
    }

    const defaultRound = rounds[0];
    setSelectedRound(defaultRound);
  }, [rounds]);

  // Update URL when selected round changes
  useEffect(() => {
    if (selectedRound) {
      setRoundIdQueryParam(selectedRound.id);
    }
  }, [selectedRound, setRoundIdQueryParam]);

  // Handler functions
  const handleRoundSelect = (round: CompleteRound) => {
    setSelectedRound(round);
  };

  const handleRoundAdd = () => {
    addRound.mutate();
  };

  const editRound = (roundId: number, data: Partial<CompleteRound>) => {
    updateRound.mutate({ id: roundId, ...data });
  };

  return {
    rounds,
    selectedRound,
    isAdmin,
    roundsLoading,
    handleRoundSelect,
    handleRoundAdd,
    editRound,
  };
}
