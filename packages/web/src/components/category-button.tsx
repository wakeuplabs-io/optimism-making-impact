import { ActionButton } from '@/components/action-button';
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { cn, isValidUrl } from '@/lib/utils';
import { Category } from '@/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Blocks, Pencil, Save, Trash, X } from 'lucide-react';
import { useState } from 'react';

type CategoryButtonProps = {
  category: Category;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, name: string) => void;
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
      <div className='flex items-center w-full gap-2 overflow-hidden'>
        <div className='h-[22px] w-[22px]'>
          {isValidUrl(props.category.icon) ? (
            <img src={props.category.icon} className='h-[22px] w-[22px]' />
          ) : (
            // DEFAULT:
            <Blocks className='h-[22px] w-[22px]' />
          )}
        </div>
        <span className='overflow-hidden text-sm font-semibold leading-5 truncate whitespace-nowrap 2xl:text-base'>
          {props.category.name}
        </span>
      </div>
      {props.isAdmin && (
        <div className='hidden gap-1 group-hover:flex'>
          <EditIcon category={props.category} onEdit={props.onEdit} />
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
    <Modal
      title='Delete category'
      subtitle='Click save when you are done.'
      trigger={<X size={14} className='stroke-[#4E4E4E] hover:stroke-black' />}
    >
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

interface EditIconProps {
  category: Category;
  onEdit?: (id: number, name: string) => void;
}

function EditIcon(props: EditIconProps) {
  const [newName, setNewName] = useState(props.category.name);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  return (
    <Modal title='Edit category' trigger={<Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />}>
      <span>Edit {props.category.name} category?</span>

      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='name' className='sr-only'>
            Title
          </Label>
          <Input
            id='name'
            name='name'
            value={newName}
            onChange={handleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Name'
          />
        </div>
      </div>

      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <DialogClose asChild>
          <ActionButton icon={<Save />} label='Save' variant='primary' onClick={() => props.onEdit?.(props.category.id, newName)} />
        </DialogClose>
      </div>
    </Modal>
  );
}
