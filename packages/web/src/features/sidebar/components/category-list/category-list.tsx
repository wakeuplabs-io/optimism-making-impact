import { AddCategoryModal } from '../add-category-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { CategoryListButton } from './category-list-button';
import { useCategories } from '@/hooks/use-categories';
import { useRounds } from '@/hooks/use-rounds';
import { useUser } from '@/hooks/use-user';
import { useMemo } from 'react';

export function CategoryList() {
  const { categories, selectedCategory, handleCategorySelect, handleCategoryDelete, handleCategoryEdit, handleCategoryAdd } =
    useCategories();
  const { isAdminModeEnabled: isAdmin } = useUser();
  const { selectedRound, roundsLoading } = useRounds();

  const items = useMemo(
    () =>
      categories?.map((category) => ({
        id: category.id,
        item: (
          <CategoryListButton
            category={category}
            isSelected={selectedCategory?.id === category.id}
            onClick={() => handleCategorySelect(category)}
            isAdmin={isAdmin}
            onDelete={handleCategoryDelete}
            onEdit={handleCategoryEdit}
          />
        ),
      })),
    [categories, handleCategorySelect, handleCategoryDelete, handleCategoryEdit, isAdmin, selectedCategory?.id],
  );

  if (!roundsLoading && selectedRound === undefined) {
    return <p className='text-center text-sm'>Select a round to view its categories.</p>;
  }

  return (
    <div className='flex flex-col gap-2'>
      <SidebarSectionList
        id='categories'
        isAdmin={isAdmin}
        title='Categories'
        isLoading={roundsLoading}
        items={items}
        addItem={<AddCategoryModal roundId={selectedRound?.id} onSave={handleCategoryAdd} />}
        maxItems={5}
      />
    </div>
  );
}
