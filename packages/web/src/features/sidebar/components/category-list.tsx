import { AddNewContent } from '@/components/add-new-content';
import { CategoryButton } from '@/components/category-button';
import { Modal } from '@/components/modal';
import { NewCategoryForm } from '@/features/sidebar/components/new-category-form';
import { useSidebarStore, useUserStore } from '@/state';

export function CategoryList() {
  const sidebarState = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const isRoundSelected = Number.isInteger(sidebarState.selectedRound.id);

  function handleCategoryClick(categoryId: number) {
    sidebarState.setSelectedCategoryId(categoryId);
  }

  if (!isRoundSelected) {
    return <p className='text-sm text-primary'>Select a round to enable.</p>;
  }

  if (!sidebarState.categories.length) {
    return <p className='text-sm text-primary'>There are no categories yet.</p>;
  }

  return (
    <>
      <ul className='flex flex-col gap-2'>
        {sidebarState.categories.map((category) => (
          <li key={category.id}>
            <CategoryButton
              category={category}
              isActive={sidebarState.selectedCategoryId === category.id}
              onClick={() => handleCategoryClick(category.id)}
              isAdmin={isAdmin}
              onDelete={sidebarState.deleteCategory}
            />
          </li>
        ))}
      </ul>
      {isAdmin && (
        <Modal title='New Category' trigger={<AddNewContent buttonText='New category' />}>
          <NewCategoryForm />
        </Modal>
      )}
    </>
  );
}
