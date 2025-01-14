import { toast } from '@/hooks/use-toast';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { SidebarStore } from '@/state/sidebar/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { Category, Round, RoundWithCategories } from '@/types';
import { AxiosError } from 'axios';

const placeHolderRound = { id: 1, name: 'Select', link1: '', link2: '', categories: [] };

export const useSidebarStore = createWithMiddlewares<SidebarStore>((set, get) => ({
  error: null,
  rounds: [],
  selectedRound: placeHolderRound,
  selectedCategoryId: 0,
  fetchData: async () => {
    const response = await RoundsService.getRounds();

    const rounds: RoundWithCategories[] = response.data.rounds;
    const selectedRound: RoundWithCategories = rounds[0];
    const categories: Category[] = selectedRound.categories;

    set(() => ({ rounds, selectedRound, categories }));
  },
  setSelectedRound: (roundId: number) => {
    const selectedRound = get().rounds.find((round) => round.id === roundId)!;
    const categories = selectedRound.categories;

    set(() => ({ selectedRound, categories }));
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
        get().fetchData();
      },
    });
  },
  setSelectedCategoryId: async (categoryId: number) => {
    set((state) => ({ ...state, selectedCategoryId: categoryId }));
  },
  addCategory: async (name: string, icon: string, roundId: number) => {
    await optimisticUpdate({
      getStateSlice: () => get().selectedRound.categories,
      updateFn: (categories) => [...categories, { id: Date.now(), name, iconURL: icon, roundId }],
      setStateSlice: (categories) => set((state) => ({ selectedRound: { ...state.selectedRound, categories } })),
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
        get().fetchData();
      },
    });
  },
  editRound: async (categoryId: number, data: Partial<Round>) => {
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
        get().fetchData();
      },
    });
  },
  editCategory: async (categoryId: number, name: string) => {
    await optimisticUpdate({
      getStateSlice: () => get().selectedRound.categories,
      updateFn: (categories) => categories.map((cat) => (cat.id === categoryId ? { ...cat, name } : cat)),
      setStateSlice: (categories) => set((state) => ({ selectedRound: { ...state.selectedRound, categories } })),
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
      getStateSlice: () => get().selectedRound.categories,
      updateFn: (categories) => categories.filter((cat) => cat.id !== categoryId),
      setStateSlice: (categories) => set((state) => ({ selectedRound: { ...state.selectedRound, categories } })),
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
