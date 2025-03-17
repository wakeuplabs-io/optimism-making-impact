import { AddCategoryModal } from '../add-category-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { CategoryListButton } from './category-list-button';
import { useCategoryList } from '@/hooks/use-category-list';

export function CategoryList() {
  const {
    categories,
    selectedCategory,
    isAdmin,
    roundsLoading,
    roundId,
    handleCategorySelect,
    handleCategoryDelete,
    handleCategoryEdit,
    handleCategoryAdd,
  } = useCategoryList();

  if (!roundsLoading && !roundId) {
    return <p className='text-center text-sm'>Select a round to view its categories.</p>;
  }

  const items =
    categories?.map((category, index) => ({
      id: category.id,
      position: index + 1,
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
    })) ?? [];

  return (
    <div className='flex flex-col gap-2'>
      <SidebarSectionList
        id='categories'
        isAdmin={isAdmin}
        title='Categories'
        isLoading={roundsLoading}
        items={items}
        addItem={<AddCategoryModal roundId={roundId} onSave={handleCategoryAdd} />}
        maxItems={5}
      />
    </div>
  );
}
