import { CategoryButton } from '@/components/category-button';
import { useSidebarStore, useUserStore } from '@/state';

export function CategoryList() {
  const sidebarState = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);

  function handleCategoryClick(categoryId: number) {
    sidebarState.setSelectedCategoryId(categoryId);
  }

  if (!sidebarState.selectedRound?.categories.length) {
    return <p className='text-sm text-primary'>There are no categories yet.</p>;
  }

  return (
    <>
      <ul className='flex flex-col gap-2'>
        {sidebarState.selectedRound.categories.map((category) => (
          <li key={category.id}>
            <CategoryButton
              category={category}
              isActive={sidebarState.selectedCategoryId === category.id}
              onClick={() => handleCategoryClick(category.id)}
              isAdmin={isAdmin}
              onDelete={sidebarState.deleteCategory}
              onEdit={sidebarState.editCategory}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
