import { SidebarListButton } from '../sidebar-list-button';
import { IconWithDefault } from '@/components/icon-with-default';
import { EditCategoryButton } from '@/features/sidebar/components/edit-category-button';
import { Category } from '@/types/categories';

type CategoryListButtonProps = {
  category: Category;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: (id: number) => void;
  onEdit: (name: string, icon: string) => void;
  isSelected?: boolean;
  isAdmin?: boolean;
};

export function CategoryListButton({ category, isAdmin, isSelected = false, onClick, onEdit, onDelete }: CategoryListButtonProps) {
  return (
    <SidebarListButton isSelected={isSelected} onClick={onClick}>
      <div className='flex items-center w-full gap-2 overflow-hidden'>
        <IconWithDefault src={category.icon ?? ''} className='h-[20px] w-[20px]' />
        <span className='overflow-hidden text-sm truncate whitespace-nowrap'>{category.name}</span>
      </div>
      {isAdmin && isSelected && (
        <div className='flex gap-1'>
          <EditCategoryButton category={category} onSave={onEdit} onDelete={(category) => onDelete(category.id)} />
        </div>
      )}
    </SidebarListButton>
  );
}
