import { CompleteRound } from '@/types/rounds';
import { createContext } from 'react';

interface RoundsContextType {
  rounds: CompleteRound[];
  roundsLoading: boolean;
  selectedRound?: CompleteRound;
  setRoundIdQueryParam(roundId: number): void;
  handleRoundAdd(): void;
  handleRoundSelect(round: CompleteRound): void;
}

export const RoundsContext = createContext<RoundsContextType | undefined>(undefined);
