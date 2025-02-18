import { toast } from '@/hooks/use-toast';
// import { router } from '@/router';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { SidebarStore } from '@/state/sidebar/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { CompleteRound, Round } from '@/types';
import { AxiosError } from 'axios';

export const useSidebarStore = createWithMiddlewares<SidebarStore>((set, get) => ({
  error: null,
  rounds: [],
  selectedRound: null,
  selectedCategoryId: -1,
  init: async () => {
    const response = await RoundsService.getRounds();
    const rounds: CompleteRound[] = response.data.rounds;

    set(() => ({ rounds }));
  },
  fetchData: async () => {
    const response = await RoundsService.getRounds();
    const rounds: CompleteRound[] = response.data.rounds;

    set(() => ({ rounds }));
  },
  setSelectedRound: (roundId: number) => {
    const selectedRound = get().rounds.find((round) => round.id === roundId);

    if (!selectedRound) return;

    const categories = selectedRound.categories;

    set(() => ({ selectedRound, categories, selectedCategoryId: categories[0] ? categories[0].id : get().selectedCategoryId }));
  },
  addRound: async () => {
    await optimisticUpdate({
      getStateSlice: () => get().rounds,
      updateFn: (rounds) => {
        return rounds[0]
          ? [{ ...rounds[0], id: rounds[0].id + 1, name: `Round ${rounds[0].id + 1}` }, ...rounds]
          : [{ id: 1, name: 'Round 1', categories: [], link1: '', link2: '' }];
      },
      setStateSlice: (rounds) => {
        set({ rounds, selectedRound: rounds[0] ?? null });
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
      onSuccess: async () => {
        get().fetchData();

        toast({ title: 'New round created', description: 'Successfully created new round from last one', variant: 'default' });
      },
    });
  },
  setSelectedCategoryId: async (categoryId: number) => {
    set((state) => ({ ...state, selectedCategoryId: categoryId }));
  },
  addCategory: async (name: string, icon: string, roundId: number) => {
    await optimisticUpdate({
      getStateSlice: () => get().selectedRound?.categories,
      updateFn: (categories) => {
        if (categories) {
          return [...categories, { id: Date.now(), name, icon: icon, roundId }];
        }
      },
      setStateSlice: (categories) => set((state) => ({ selectedRound: { ...state.selectedRound, categories } })),
      apiCall: () => CategoriesService.createOne({ name, icon, roundId }),
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
  editCategory: async (name: string, icon: string) => {
    const selectedCategoryId = get().selectedCategoryId;
    await optimisticUpdate({
      getStateSlice: () => get().selectedRound?.categories,
      updateFn: (categories) => {
        if (categories) {
          return categories.map((cat) => (cat.id === selectedCategoryId ? { ...cat, name, icon } : cat));
        }
      },
      setStateSlice: (categories) => set((state) => ({ selectedRound: { ...state.selectedRound, categories } })),
      apiCall: () => CategoriesService.editOne(selectedCategoryId, name, icon),
      onError: (error) => {
        const title = 'Failed to update category';
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
  deleteCategory: async (categoryId: number) => {
    await optimisticUpdate({
      getStateSlice: () => get().selectedRound?.categories,
      updateFn: (categories) => categories?.filter((cat) => cat.id !== categoryId),
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
      onSuccess: () => {
        get().fetchData();
      },
    });
  },
}));
