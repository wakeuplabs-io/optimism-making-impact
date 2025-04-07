import { CategoriesContext } from './categories-context';
import { useQueryParams } from '@/hooks/use-query-params';
import { toast } from '@/hooks/use-toast';
import { queryClient } from '@/main';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { CompleteRound } from '@/types/rounds';
import { Category, CreateCategoryBody } from '@optimism-making-impact/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReactNode, useEffect, useState } from 'react';

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const { selectedRoundId, selectedCategoryId, setSelectedCategoryId } = useQueryParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

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
      setSelectedCategoryId(data.id);
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
  }, [selectedCategory, setSelectedCategoryId]);

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

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        categoriesLoading: roundsLoading,
        selectedCategory,
        handleCategorySelect,
        handleCategoryDelete,
        handleCategoryEdit,
        handleCategoryAdd,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
