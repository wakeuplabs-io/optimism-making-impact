import { toast } from '@/hooks/use-toast';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { SidebarStore } from '@/state/sidebar/types';
import { createWithMiddlewares } from '@/state/utils/create-with-middlewares';
import { optimisticUpdate } from '@/state/utils/optimistic-update';
import { CompleteRound } from '@/types/rounds';
import { UpdateRoundBody } from '@optimism-making-impact/schemas';
import { AxiosError } from 'axios';

export const useSidebarStore = createWithMiddlewares<SidebarStore>((set, get) => ({
  error: null,
  rounds: [],
  selectedRound: null,
  selectedCategoryId: 0,
  categoriesInProgress: [],
  init: async () => {
    const response = await RoundsService.getRounds();
    const rounds: CompleteRound[] = response.data.rounds;

    set(() => ({ rounds }));
  },
  fetchData: async () => {
    const response = await RoundsService.getRounds();
    const rounds: CompleteRound[] = response.data.rounds;

    const updatedSelectedRound = rounds.find((round) => round.id === get().selectedRound?.id);

    set(() => ({ rounds, selectedRound: updatedSelectedRound ?? null }));
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
    const provisoryCategoryId = Date.now();

    await optimisticUpdate({
      getStateSlice: () => ({ categories: get().selectedRound?.categories, categoriesInProgress: get().categoriesInProgress }),
      updateFn: ({ categories, categoriesInProgress }) => ({
        categories: categories ? [...categories, { id: provisoryCategoryId, name, icon: icon, roundId }] : [],
        categoriesInProgress: [...categoriesInProgress, provisoryCategoryId],
      }),
      setStateSlice: ({ categories, categoriesInProgress }) =>
        set((state) => ({ selectedRound: { ...state.selectedRound, categories }, categoriesInProgress })),
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
        // Remove the provisory category from the categoriesInProgress array
        set((state) => ({
          categoriesInProgress: state.categoriesInProgress.filter((id) => id !== provisoryCategoryId),
        }));
        get().fetchData();
      },
    });
  },
  editRound: async (roundId: number, data: UpdateRoundBody) => {
    await optimisticUpdate({
      getStateSlice: () => get().rounds,
      updateFn: (rounds) => rounds.map((round) => (round.id === roundId ? { ...round, ...data } : round)),
      setStateSlice: (rounds) => set({ rounds }),
      apiCall: () => RoundsService.editOne(roundId, data),
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
  isCategoryInProgress: (categoryId: number) => {
    return get().categoriesInProgress.includes(categoryId);
  },
}));
