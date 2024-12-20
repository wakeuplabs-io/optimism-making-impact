import { fetcher } from '@/lib/fetcher';
import { create } from 'zustand';

type Round = {
  id: string;
  icon: string;
  name: string;
};

const placeHolderRound: Round[] = [{ id: 'fake-id', name: 'fake-round-name', icon: 'fake-icon-1.svg' }];

interface SidebarState {
  loading: boolean;
  error: string | null;
  rounds: Round[];
  selectedRound: Round;
}

interface SidebarActions {
  setSelectedRound: (roundId: string) => void;
  setRounds: () => void;
}

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>()((set) => ({
  loading: false,
  error: null,
  rounds: placeHolderRound,
  selectedRound: placeHolderRound[0],
  setSelectedRound: (roundId: string) => set((state) => ({ ...state, selectedRound: state.rounds.find((round) => round.id === roundId)! })),
  setRounds: async () => {
    set((state) => ({ ...state, loading: true }));

    const rounds = await fetcher.get('/rounds').then((res) => res.data);

    const newRounds: Round[] = rounds.data.rounds.map((round: Round) => ({ id: round.id, name: round.name, icon: round.icon }));
    const selectedRound = newRounds[0];

    set((state) => ({ ...state, loading: false, rounds: newRounds, selectedRound }));
  },
}));
