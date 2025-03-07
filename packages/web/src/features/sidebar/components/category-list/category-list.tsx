import { AddCategoryModal } from '../add-category-modal';
import { CategoryListButton } from '@/features/sidebar/components/category-list/category-list-button';
import { useSidebarStore, useUserStore } from '@/state';
import { Category } from '@/types';
import { SidebarSectionList } from '../sidebar-section-list';

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
  roundId: number;
  categories: Category[];
}

function Content({ categories, roundId }: ContentProps) {
  const sidebarState = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const addCategory = useSidebarStore((state) => state.addCategory);

  if (categories.length === 0) return <EmptyState />;

  return (
    <SidebarSectionList
      id='categories'
      isAdmin={isAdmin}
      title='Categories'
      items={categories.map((category) => ({
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
      }))}
      addItem={<AddCategoryModal roundId={roundId} onSave={(name, icon, roundId) => addCategory(name, icon, roundId)} />}
      maxItems={5}
    />
  );
}

function EmptyState() {
  return <p className='text-center text-sm'>There are no categories yet.</p>;
}
