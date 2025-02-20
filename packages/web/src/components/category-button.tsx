import { IconWithDefault } from '@/components/icon-with-default';
import { EditCategoryButton } from '@/features/sidebar/components/edit-category-button';
import { cn } from '@/lib/utils';
import { Category } from '@/types';

type CategoryButtonProps = {
  category: Category;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onDelete: (id: number) => void;
  onEdit: (name: string, icon: string) => void;
  isActive?: boolean;
  isAdmin?: boolean;
};

export function CategoryButton(props: CategoryButtonProps) {
  console.log(props.category.icon);
  return (
    <button
      className={cn(
        `group flex w-full items-center justify-between gap-1 rounded-[10px] px-4 py-2 text-secondary shadow-none hover:bg-[#F1F4F9] hover:text-dark-high`,
        props.isActive && 'text-dark-high bg-[#F1F4F9]',
      )}
      onClick={props.onClick}
    >
      <div className='flex items-center w-full gap-2 overflow-hidden'>
        <div className='h-[22px] w-[22px]'>
          <IconWithDefault src={props.category.icon ?? ''} />
        </div>
        <span className='overflow-hidden truncate whitespace-nowrap text-[16px] leading-5 2xl:text-base'>{props.category.name}</span>
      </div>
      {props.isAdmin && props.isActive && (
        <div className='flex gap-1'>
          <EditCategoryButton category={props.category} onSave={props.onEdit} />
        </div>
      )}
    </button>
  );
}
