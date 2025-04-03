import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
import { createContext } from 'react';

interface RoundsContextType {
  rounds: CompleteRound[];
  roundsLoading: boolean;
  selectedRound?: CompleteRound;
  handleRoundAdd(): void;
  handleRoundSelect(round: CompleteRound): void;
  handleEditRound(roundId: number, data: UpdateRoundBody): void;
}

export const RoundsContext = createContext<RoundsContextType | undefined>(undefined);
