import { AddNewContent } from '@/components/add-new-content';
import { CategoryButton } from '@/components/category-button';
import { Modal } from '@/components/modal';
import { NewCategoryForm } from '@/features/sidebar/components/new-category-form';
import { useSidebarStore, useUserStore } from '@/state';
import { useState } from 'react';

export function CategoryList() {
  const categoriesState = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const [activeCategory, setActiveCategory] = useState(categoriesState.categories[0]?.id);
  const isRoundSelected = Number.isInteger(categoriesState.selectedRound.id);

  function handleCategoryClick(categoryId: string) {
    setActiveCategory(categoryId);
  }

  if (!isRoundSelected) {
    return <p className="text-sm text-primary">Select a round to enable.</p>;
  }

  if (!categoriesState.categories.length) {
    return <p className="text-sm text-primary">There are no categories yet.</p>;
  }

  return (
    <>
      <ul className="grid gap-2">
        {categoriesState.categories.map((category) => (
          <li key={category.id}>
            <CategoryButton
              label={category.name}
              isActive={activeCategory == category.id}
              onClick={() => handleCategoryClick(category.id)}
              iconURL={category.icon}
            />
          </li>
        ))}
      </ul>
      {isAdmin && (
        <Modal title="New Category" trigger={<AddNewContent buttonText="New category" />}>
          <NewCategoryForm />
        </Modal>
      )}
    </>
  );
}
