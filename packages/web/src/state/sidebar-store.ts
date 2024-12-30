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
  roundId: string;
  name: string;
  icon?: string;
};

interface SidebarState {
  loading: boolean;
  error: string | null;
  rounds: Round[];
  selectedRound: Round;
  categories: Category[];
}

export type CategoryFormData = {
  title: string;
  iconURL: string;
};

interface SidebarActions {
  setSelectedRound: (roundId: string) => void;
  setRounds: () => void;
  addRound: () => void;
  setCategories: () => void;
  addCategory: (formData: CategoryFormData, roundId: string) => void;
}

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>()((set, get) => ({
  loading: false,
  error: null,
  rounds: placeHolderRound,
  selectedRound: placeHolderRound[0],
  setSelectedRound: (roundId: string) => {
    set((state) => ({ ...state, selectedRound: state.rounds.find((round) => round.id === roundId)! }));
    get().setCategories();
  },
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
  categories: [],
  setCategories: async () => {
    set((state) => ({ ...state, loading: true }));

    const categories = await fetcher.get('/categories').then((res) => res.data);

    const filterCategoriesByRound: Category[] = categories.data.categories
      .map((category: Category) => ({
        id: category.id,
        roundId: category.roundId,
        name: category.name,
        icon: category.icon,
      }))
      .filter((category: Category) => get().selectedRound.id == category.roundId);

    set((state) => ({ ...state, loading: false, categories: filterCategoriesByRound }));
  },
  addCategory: async (formData: CategoryFormData, roundId: string) => {
    set((state) => ({ ...state, loading: true }));

    await fetcher
      .post('/categories', {
        ...formData,
        roundId: roundId,
      })
      .then((res) => res.data);

    get().setCategories();

    set((state) => ({ ...state, loading: false }));
  },
}));
