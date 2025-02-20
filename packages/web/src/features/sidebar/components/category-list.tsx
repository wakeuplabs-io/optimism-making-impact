import { AddCategoryModal } from './add-category-modal';
import { CategoryButton } from '@/components/category-button';
import { useSidebarStore, useUserStore } from '@/state';
import { Category } from '@/types';

export function CategoryList(props: ContentProps) {
  return (
    <Container>
      <Content {...props} />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  return <div className='mb-6 flex flex-col gap-2'>{props.children} </div>;
}

interface ContentProps {
  title: string;
  categories: Category[];
}

function Content({ title, categories }: ContentProps) {
  const sidebarState = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  return (
    <>
      <h2 className='text-sm font-medium text-gray-500'>{title}</h2>
      <ul className='flex flex-col gap-2'>
        {categories.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryButton
                  category={category}
                  isActive={sidebarState.selectedCategoryId === category.id}
                  onClick={() => sidebarState.setSelectedCategoryId(category.id)}
                  isAdmin={isAdmin}
                  onDelete={sidebarState.deleteCategory}
                  onEdit={sidebarState.editCategory}
                />
              </li>
            ))}
            {isAdmin && (
              <li key='add-category'>
                <AddCategoryModal roundId={1} onSave={() => {}} />
              </li>
            )}
          </>
        )}
      </ul>
    </>
  );
}

function EmptyState() {
  return <p className='text-center text-sm'>There are no categories yet.</p>;
}
