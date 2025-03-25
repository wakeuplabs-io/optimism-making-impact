import { SidebarListButton } from '../sidebar-list-button';
import { IconWithDefault } from '@/components/icon-with-default';
import { EditCategoryButton } from '@/features/sidebar/components/edit-category-button';
import { Category } from '@optimism-making-impact/schemas';

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
    <SidebarListButton isSelected={isSelected} isDisabled={category.id < 0} onClick={onClick}>
      <div className='flex w-full items-center gap-2 overflow-hidden'>
        <IconWithDefault src={category.icon ?? ''} />
        <span className='overflow-hidden truncate whitespace-nowrap text-sm'>{category.name}</span>
      </div>
      {isAdmin && isSelected && (
        <div className='flex gap-1'>
          <EditCategoryButton category={category} onSave={onEdit} onDelete={(category) => onDelete(category.id)} />
        </div>
      )}
    </SidebarListButton>
  );
}
