import { fetcher } from '@/lib/fetcher';
import { create } from 'zustand';

type Round = {
  id: string;
  icon?: string;
  name: string;
};

const placeHolderRound: Round[] = [{ id: 'select-round-id', name: 'Select' }];

type Category = {
  id: string;
  round_id: string;
  name: string;
  icon?: string;
};

const placeHolderCategory: Category[] = [{ id: 'Select-category-id', round_id: 'Select-category-round_id', name: 'Select' }];

interface SidebarState {
  loading: boolean;
  error: string | null;
  rounds: Round[];
  selectedRound: Round;
}

interface SidebarActions {
  setSelectedRound: (roundId: string) => void;
  setRounds: () => void;
  addRound: () => void;
}

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>()((set, get) => ({
  loading: false,
  error: null,
  rounds: placeHolderRound,
  selectedRound: placeHolderRound[0],
  setSelectedRound: (roundId: string) => set((state) => ({ ...state, selectedRound: state.rounds.find((round) => round.id === roundId)! })),
  setRounds: async () => {
    set((state) => ({ ...state, loading: true }));

    const rounds = await fetcher.get('/rounds').then((res) => res.data);

    const newRounds: Round[] = rounds.data.rounds.map((round: Round) => ({ id: round.id, name: round.name, icon: round.icon }));

    set((state) => ({ ...state, loading: false, rounds: newRounds }));
  },
  addRound: async () => {
    set((state) => ({ ...state, loading: true }));

    await fetcher.post('/rounds').then((res) => res.data);
    get().setRounds();

    set((state) => ({ ...state, loading: false }));
  },
}));
