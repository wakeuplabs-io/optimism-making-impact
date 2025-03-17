import { AddCategoryModal } from '../add-category-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { CategoryListButton } from '@/features/sidebar/components/category-list/category-list-button';
import { router } from '@/router';
import { CategoriesService } from '@/services/categories-service';
import { RoundsService } from '@/services/rounds-service';
import { useUserStore } from '@/state/user-store/user-store';
import { Category } from '@/types/categories';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function CategoryList() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-2'>{props.children} </div>;
}

function Content() {
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  const search = useSearch({ from: '/' });
  const { roundId } = search;
  const { data: rounds = [], isLoading: roundsLoading } = useQuery({
    queryKey: ['rounds'],
    queryFn: () => RoundsService.getRounds(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const addCategory = useMutation({
    mutationFn: ({ name, icon, roundId }: { name: string; icon: string; roundId: number }) =>
      CategoriesService.createOne({ name, icon, roundId }),
  });

  useEffect(() => {
    if (categories.length === 0) {
      return;
    }
    const defaultCategory = categories[0];
    setSelectedCategory(defaultCategory);
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryIdQueryParam(selectedCategory.id);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (rounds.length === 0) {
      return;
    }
    const foundRound = rounds.find((round) => round.id === roundId) || null;
    setCategories(foundRound?.categories ?? []);
  }, [rounds, roundId]);

  const deleteCategory = useMutation({
    mutationFn: (categoryId: number) => CategoriesService.deleteOne(categoryId),
  });

  const editCategory = useMutation({
    mutationFn: async ({ name, icon }: { name: string; icon: string }) => {
      if (!selectedCategory?.id) throw new Error('No category selected');
      return CategoriesService.editOne(selectedCategory.id, name, icon);
    },
  });

  const setCategoryIdQueryParam = (categoryId: number) => {
    router.navigate({ search: { ...search, categoryId }, reloadDocument: false, to: '/' });
  };

  if (!roundsLoading && !roundId) return <p className='text-center text-sm'>Select a round to view it's categories.</p>;

  return (
    <SidebarSectionList
      id='categories'
      isAdmin={isAdmin}
      title='Categories'
      isLoading={roundsLoading}
      items={
        categories?.map((category) => ({
          id: category.id,
          item: (
            <CategoryListButton
              category={category}
              isSelected={selectedCategory?.id === category.id}
              onClick={() => setSelectedCategory(category)}
              isAdmin={isAdmin}
              onDelete={deleteCategory.mutate}
              onEdit={(name, icon) => editCategory.mutate({ name, icon })}
            />
          ),
        })) ?? []
      }
      addItem={<AddCategoryModal roundId={roundId} onSave={(name, icon, roundId) => addCategory.mutate({ name, icon, roundId })} />}
      maxItems={5}
    />
  );
}
