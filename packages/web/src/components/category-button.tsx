import { ActionButton } from '@/components/action-button';
import { Modal } from '@/components/modal';
import { cn } from '@/lib/utils';
import { Category } from '@/state';
import { DialogClose } from '@radix-ui/react-dialog';
import { Blocks, Pencil, Trash, X } from 'lucide-react';

type CategoryButtonProps = {
  category: Category;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: (id: number) => void;
  isActive?: boolean;
  isAdmin?: boolean;
};

export function CategoryButton(props: CategoryButtonProps) {
  return (
    <button
      className={cn(
        `group flex w-full items-center justify-between gap-1 rounded-[10px] px-4 py-2 text-secondary shadow-none hover:bg-[#B8B8B8] hover:text-dark-high`,
        props.isActive && 'text-dark-high',
      )}
      onClick={props.onClick}
    >
      <div className='flex w-full items-center gap-2 overflow-hidden'>
        <div className='h-[22px] w-[22px]'>
          {props.category.icon ? (
            <img src={props.category.icon} className='h-[22px] w-[22px]' />
          ) : (
            // DEFAULT:
            <Blocks className='h-[22px] w-[22px]' />
          )}
        </div>
        <span className='overflow-hidden truncate whitespace-nowrap text-sm font-semibold leading-5 2xl:text-base'>
          {props.category.name}
        </span>
      </div>
      {props.isAdmin && (
        <div className='hidden gap-1 group-hover:flex'>
          <Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />
          <DeleteIcon category={props.category} onDelete={props.onDelete} />
        </div>
      )}
    </button>
  );
}

interface DeleteIconProps {
  category: Category;
  onDelete?: (id: number) => void;
}

function DeleteIcon(props: DeleteIconProps) {
  return (
    <Modal title='Delete category' trigger={<X size={14} className='stroke-[#4E4E4E] hover:stroke-black' />}>
      <span>Are you sure you want to delete {props.category.name} category?</span>

      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <ActionButton icon={<Trash />} label='Delete' variant='primary' onClick={() => props.onDelete?.(props.category.id)} />
      </div>
    </Modal>
  );
}
