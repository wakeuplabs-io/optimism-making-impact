import { toast } from './use-toast';
import { useUser } from './use-user';
import { useQueryParams } from '@/hooks/use-query-params';
import { queryClient } from '@/main';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { Category } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export function useCategoryList() {
  const { isAdminModeEnabled: isAdmin } = useUser();
  const { selectedRoundId, selectedCategoryId, setSelectedCategoryId } = useQueryParams();

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
    onSuccess: ({ data }) => {
      setSelectedCategoryId(data.id);
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
    onError: (err) => {
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

    const foundRound = rounds.find((round) => round.id === selectedRoundId) || null;
    setCategories(foundRound?.categories ?? []);
  }, [rounds, selectedRoundId]);

  // Set default category
  useEffect(() => {
    if (categories.length === 0) return;

    const newCategory = categories.find((c) => c.id === selectedCategoryId);
    setSelectedCategory(newCategory ?? categories[0]);
  }, [categories]);

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategoryId(selectedCategory.id);
    }
  }, [selectedCategory]);

  // Helper functions

  const resetCategoryIdQueryParam = () => {
    setSelectedCategoryId(undefined);
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
    roundId: selectedRoundId,
    handleCategorySelect,
    handleCategoryDelete,
    handleCategoryEdit,
    handleCategoryAdd,
  };
}
