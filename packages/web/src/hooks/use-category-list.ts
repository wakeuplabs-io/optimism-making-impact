import { useUser } from './use-user';
import { queryClient } from '@/main';
import { router } from '@/router';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { Category } from '@/types/categories';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

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
    mutationFn: ({ name, icon, roundId }: { name: string; icon: string; roundId: number }) =>
      CategoriesService.createOne({ name, icon, roundId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (categoryId: number) => CategoriesService.deleteOne(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
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
  const setCategoryIdQueryParam = (categoryId: number) => {
    router.navigate({
      search: (prev) => ({ ...prev, categoryId }),
      reloadDocument: false,
      to: '/',
    });
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
