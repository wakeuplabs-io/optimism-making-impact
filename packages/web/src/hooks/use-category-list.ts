import { useUser } from './use-user';
import { queryClient } from '@/main';
import { router } from '@/router';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { Category, CreateCategoryBody } from '@optimism-making-impact/schemas';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { toast } from './use-toast';
import { CompleteRound } from '@/types/rounds';

export function useCategoryList() {
  const { isAdminModeEnabled: isAdmin } = useUser();
  const search = useSearch({ from: '/' });
  const { roundId, categoryId } = search;

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Fetch rounds
  const { data: rounds = [], isLoading: roundsLoading } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  // Mutations
  const addCategory = useMutation({
    mutationFn: ({ name, icon, roundId }: CreateCategoryBody) => CategoriesService.createOne({ name, icon, roundId }),
    onSuccess: ({ data }) => {
      setCategoryIdQueryParam(data.id);
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
    onMutate: async ({ name, icon, roundId }: CreateCategoryBody) => {
      await queryClient.cancelQueries({ queryKey: ['rounds'] });
      const previousRounds = queryClient.getQueryData<CompleteRound[]>(['rounds']);

      if (!previousRounds) throw new Error('add category -No rounds found');

      const updatedRounds = previousRounds.map((round) => {
        if (round.id === roundId) {
          return {
            ...round,
            categories: [{ id: -1, name, icon }, ...round.categories],
          };
        }
        return round;
      });

      queryClient.setQueryData(['rounds'], updatedRounds);

      return { previousRounds };
    },
    onError: (err, _, context) => {
      if (context?.previousRounds) {
        queryClient.setQueryData(['rounds'], context.previousRounds);
      }

      let description = `Failed to create category`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to create category', description, variant: 'destructive' });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (categoryId: number) => CategoriesService.deleteOne(categoryId),
    onSuccess: () => {
      resetCategoryIdQueryParam();
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
    onError: (err, categoryId) => {
      let description = `Failed to delete category id ${categoryId}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to delete category', description, variant: 'destructive' });
    },
  });

  const editCategory = useMutation({
    mutationFn: async ({ name, icon }: { name: string; icon: string }) => {
      if (!selectedCategory?.id) throw new Error('No category selected');
      return CategoriesService.editOne(selectedCategory.id, name, icon);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
    onError: (err) => {
      let description = `Failed to edit category id ${selectedCategory?.id}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to edit category', description, variant: 'destructive' });
    },
  });

  // Load categories when rounds change
  useEffect(() => {
    if (rounds.length === 0) return;

    const foundRound = rounds.find((round) => round.id === roundId) || null;
    setCategories(foundRound?.categories ?? []);
  }, [rounds, roundId]);

  // Set default category
  useEffect(() => {
    if (categories.length === 0) return;

    const newCategory = categories.find((c) => c.id === categoryId);
    setSelectedCategory(newCategory ?? categories[0]);
  }, [categories]);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      setCategoryIdQueryParam(selectedCategory.id);
    }
  }, [selectedCategory]);

  // Helper functions
  const setCategoryIdQueryParam = (categoryId: number | undefined) => {
    router.navigate({
      search: (prev) => ({ ...prev, categoryId }),
      reloadDocument: false,
      to: '/',
    });
  };

  const resetCategoryIdQueryParam = () => {
    setCategoryIdQueryParam(undefined);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleCategoryDelete = (categoryId: number) => {
    deleteCategory.mutate(categoryId);
  };

  const handleCategoryEdit = (name: string, icon: string) => {
    editCategory.mutate({ name, icon });
  };

  const handleCategoryAdd = (name: string, icon: string, roundId: number) => {
    addCategory.mutate({ name, icon, roundId });
  };

  return {
    categories,
    selectedCategory,
    isAdmin,
    roundsLoading,
    roundId,
    handleCategorySelect,
    handleCategoryDelete,
    handleCategoryEdit,
    handleCategoryAdd,
  };
}
