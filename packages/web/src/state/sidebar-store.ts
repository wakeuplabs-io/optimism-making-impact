import { toast } from '@/hooks/use-toast';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { createWithMiddlewares } from '@/state/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { AxiosError } from 'axios';

// TODO: move to a types file
export type Round = {
  id: number;
  icon?: string;
  name: string;
  link1: string;
  link2: string;
};

const placeHolderRound = { id: -1, name: 'Select', link1: '', link2: '' };

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
  editRound: (roundId: number, data: Partial<Round>) => void;
  setCategories: () => void;
  addCategory: (formData: CategoryFormData, roundId: number) => void;
  editCategory: (categoryId: number, name: string) => void;
  deleteCategory: (categoryId: number) => void;
}

type SidebarStore = SidebarState & SidebarActions;

export const useSidebarStore = createWithMiddlewares<SidebarStore>((set, get) => ({
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

    const filterCategoriesByRound: Category[] = categories.data.categories.filter(
      (category: Category) => get().selectedRound.id == category.roundId,
    );

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
  editRound: async (categoryId: number, data: Partial<Round>) => {
    try {
      set((state) => ({ ...state, loading: true }));

      const editedRound = await RoundsService.editOne(categoryId, data);

      set((state) => ({ ...state, selectedRound: editedRound.data.data }));
    } catch (error) {
      console.error(error);
      set(() => ({ error: `Error editing round` }));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  editCategory: async (categoryId: number, name: string) => {
    await optimisticUpdate({
      getStateSlice: () => get().categories,
      updateFn: (categories) => categories.map((cat) => (cat.id === categoryId ? { ...cat, name } : cat)),
      setStateSlice: (categories) => set({ categories }),
      apiCall: () => CategoriesService.editOne(categoryId, name),
      onError: (error) => {
        const title = 'Failed to update category';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
    });
  },
  deleteCategory: async (categoryId: number) => {
    set((state) => ({ ...state, loading: true }));

    await CategoriesService.deleteOne(categoryId);

    get().setCategories();

    set((state) => ({ ...state, loading: false }));
  },
}));
