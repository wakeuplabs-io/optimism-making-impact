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
  return <div className='flex flex-col gap-2 my-5'>{props.children} </div>;
}

interface ContentProps {
  categories: Category[];
}

function Content(props: ContentProps) {
  const sidebarState = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  if (props.categories.length === 0) return <EmptyState />;

  return (
    <>
      <ul className='flex flex-col gap-2'>
        {props.categories.map((category) => (
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
      </ul>
    </>
  );
}

function EmptyState() {
  return <p className='text-sm text-center'>There are no categories yet.</p>;
}
