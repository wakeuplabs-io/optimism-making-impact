import { toast } from '@/hooks/use-toast';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { SidebarStore } from '@/state/sidebar/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { Category, Round } from '@/types';
import { AxiosError } from 'axios';

const placeHolderRound = { id: 1, name: 'Select', link1: '', link2: '' };

export const useSidebarStore = createWithMiddlewares<SidebarStore>((set, get) => ({
  error: null,
  rounds: [],
  selectedRound: placeHolderRound,
  selectedCategoryId: 0,
  categories: [],
  setSelectedRound: (roundId: number) => {
    set((state) => ({ ...state, selectedRound: state.rounds.find((round) => round.id === roundId)! }));
    get().setCategories();
  },
  setRounds: async () => {
    const rounds = await RoundsService.getRounds();
    const newRounds: Round[] = rounds.data.rounds;

    //  cuando creo una round que me la muestre por defecto
    set(() => ({ rounds: newRounds, selectedRound: newRounds[0] }));
  },
  addRound: async () => {
    await optimisticUpdate({
      getStateSlice: () => get().rounds,
      updateFn: (rounds) => [{ ...rounds[0], id: rounds[0].id, name: `Round ${rounds[0].id + 1}` }, ...rounds],
      setStateSlice: (rounds) => {
        set({ rounds, selectedRound: rounds[0] });
      },
      apiCall: () => RoundsService.createRound(),
      onError: (error) => {
        const title = 'Failed to add round';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: () => {
        get().setRounds();
      },
    });
  },

  setCategories: async () => {
    const response = await CategoriesService.getAllByRound(get().selectedRound.id);

    const filterCategoriesByRound: Category[] = response.data.categories;

    set(() => ({ categories: filterCategoriesByRound }));
  },
  setSelectedCategoryId: async (categoryId: number) => {
    set((state) => ({ ...state, selectedCategoryId: categoryId }));
  },
  addCategory: async (name: string, icon: string, roundId: number) => {
    await optimisticUpdate({
      getStateSlice: () => get().categories,
      updateFn: (categories) => [...categories, { id: Date.now(), name, iconURL: icon, roundId }],
      setStateSlice: (categories) => set({ categories }),
      apiCall: () => CategoriesService.createOne({ title: name, iconURL: icon, roundId }),
      onError: (error) => {
        const title = 'Failed to add category';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });
      },
      onSuccess: () => {
        get().setCategories();
      },
    });
  },
  editRound: async (categoryId: number, data: Round) => {
    await optimisticUpdate({
      getStateSlice: () => get().rounds,
      updateFn: (rounds) => rounds.map((round) => (round.id === data.id ? { ...round, ...data } : round)),
      setStateSlice: (rounds) => set({ rounds }),
      apiCall: () => RoundsService.editOne(categoryId, data),
      onError: (error, rollbackState) => {
        const title = 'Failed to update round';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });

        console.error('Rollback state:', rollbackState);
      },
      onSuccess: () => {
        get().setRounds();
      },
    });
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
    await optimisticUpdate({
      getStateSlice: () => get().categories,
      updateFn: (categories) => categories.filter((cat) => cat.id !== categoryId),
      setStateSlice: (categories) => set({ categories }),
      apiCall: () => CategoriesService.deleteOne(categoryId),
      onError: (error, rollbackState) => {
        const title = 'Failed to delete category';
        let description = 'Unknown error';

        if (error instanceof AxiosError) {
          description = error.response?.data.error.message;
        }

        toast({ title, description, variant: 'destructive' });

        console.error('Rollback state:', rollbackState);
      },
    });
  },
}));
