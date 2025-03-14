import { AddCategoryModal } from '../add-category-modal';
import { SidebarSectionList } from '../sidebar-section-list';
import { CategoryListButton } from '@/features/sidebar/components/category-list/category-list-button';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
import { useUserStore } from '@/state/user-store/user-store';
import { Category } from '@/types/categories';
import { useState } from 'react';

export function CategoryList(props: ContentProps) {
  return (
    <Container>
      <Content {...props} />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  return <div className='flex flex-col gap-2'>{props.children} </div>;
}

interface ContentProps {
  roundId?: number;
  categories: Category[];
}

function Content({ categories, roundId }: ContentProps) {
  const sidebarState = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const addCategory = useSidebarStore((state) => state.addCategory);

  // This loading actually depends on round fetching
  // If there's no selected round then there are no categories to show
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  if (!isLoading && !roundId) return <p className='text-center text-sm'>Select a round to view it's categories.</p>;

  return (
    <SidebarSectionList
      id='categories'
      isAdmin={isAdmin}
      title='Categories'
      isLoading={isLoading}
      items={
        categories?.map((category) => ({
          id: category.id,
          item: (
            <CategoryListButton
              category={category}
              isSelected={sidebarState.selectedCategoryId === category.id}
              onClick={() => sidebarState.setSelectedCategoryId(category.id)}
              isAdmin={isAdmin}
              onDelete={sidebarState.deleteCategory}
              onEdit={sidebarState.editCategory}
            />
          ),
        })) ?? []
      }
      addItem={<AddCategoryModal roundId={roundId} onSave={(name, icon, roundId) => addCategory(name, icon, roundId)} />}
      maxItems={5}
    />
  );
}
