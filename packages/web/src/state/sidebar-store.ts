import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { create } from 'zustand';

type Round = {
  id: number;
  icon?: string;
  name: string;
};

const placeHolderRound = { id: -1, name: 'Select' };

// TODO: move to a types file
export type Category = {
  id: number;
  roundId: number;
  name: string;
  icon?: string;
};

interface SidebarState {
  loading: boolean;
  error: string | null;
  rounds: Round[];
  selectedRound: Round;
  categories: Category[];
  selectedCategoryId: number;
}

export type CategoryFormData = {
  title: string;
  iconURL: string;
};

interface SidebarActions {
  setSelectedRound: (roundId: number) => void;
  setSelectedCategoryId: (categoryId: number) => void;
  setRounds: () => void;
  addRound: () => void;
  setCategories: () => void;
  addCategory: (formData: CategoryFormData, roundId: number) => void;
  editCategory: (categoryId: number, name: string) => void;
  deleteCategory: (categoryId: number) => void;
}

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = create<SidebarStore>()((set, get) => ({
  loading: false,
  error: null,
  rounds: [],
  selectedRound: placeHolderRound,
  selectedCategoryId: 0,
  setSelectedRound: (roundId: number) => {
    set((state) => ({ ...state, selectedRound: state.rounds.find((round) => round.id === roundId)! }));
    get().setCategories();
  },
  setRounds: async () => {
    set((state) => ({ ...state, loading: true }));

    const rounds = await RoundsService.getRounds();
    const newRounds: Round[] = rounds.data.rounds;

    set((state) => ({ ...state, loading: false, rounds: newRounds, selectedRound: newRounds[0] }));
  },
  addRound: async () => {
    set((state) => ({ ...state, loading: true }));

    await RoundsService.createRound();
    get().setRounds();

    set((state) => ({ ...state, loading: false }));
  },
  categories: [],
  setCategories: async () => {
    set((state) => ({ ...state, loading: true }));

    const categories = await CategoriesService.getAll();

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
  setSelectedCategoryId: async (categoryId: number) => {
    set((state) => ({ ...state, selectedCategoryId: categoryId }));
  },
  addCategory: async (formData: CategoryFormData, roundId: number) => {
    set((state) => ({ ...state, loading: true }));

    await CategoriesService.createOne({ ...formData, roundId: roundId });

    get().setCategories();

    set((state) => ({ ...state, loading: false }));
  },
  editCategory: async (categoryId: number, name: string) => {
    try {
      set((state) => ({ ...state, loading: true }));

      await CategoriesService.editOne(categoryId, name);

      get().setCategories();
    } catch (error) {
      console.error(error);
      set(() => ({ error: `Error editing ${name} category` }));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  deleteCategory: async (categoryId: number) => {
    set((state) => ({ ...state, loading: true }));

    await CategoriesService.deleteOne(categoryId);

    get().setCategories();

    set((state) => ({ ...state, loading: false }));
  },
}));
