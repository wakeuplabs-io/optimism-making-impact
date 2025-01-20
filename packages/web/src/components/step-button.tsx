import { ActionButton } from '@/components/action-button';
import { IconWithDefault } from '@/components/icon-with-default';
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Pencil, Save, Trash, X } from 'lucide-react';
import { useState } from 'react';

type StepButtonState = 'past' | 'active' | 'coming';

interface StepButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  state: StepButtonState;
  isAdmin?: boolean;
  step: Step;
  onDelete?: (stepId: number) => void;
  onEdit?: (stepId: number, data: UpdateStepBody) => void;
}

const buttonVariants: Record<StepButtonState, string> = {
  past: 'border-white-low text-white-low hover:bg-primary hover:text-white transition-all ease-in-out duration-500',
  active: 'border-primary',
  coming: 'border-secondary hover:bg-primary hover:text-white transition-all ease-in-out duration-500',
};

export function StepButton({ isAdmin, onEdit, onDelete, ...props }: StepButtonProps) {
  const isMobile = useIsMobile();
  const showActionIcons = isAdmin && !isMobile;

  return (
    <button
      {...props}
      className={cn(
        'flex h-[45px] max-w-[300px] items-center overflow-hidden whitespace-nowrap rounded-3xl border px-[27px] py-[12px]',
        buttonVariants[props.state],
        { 'w-[45px] justify-center p-5 px-0 py-0': isMobile },
      )}
    >
      <div className='flex max-w-full items-center gap-2'>
        <div>
          <IconWithDefault src={props.step.icon} />
        </div>

        {!isMobile && <div className='flex-1 truncate text-left'>{props.step.title}</div>}

        {showActionIcons && (
          <div className='ml-1 flex gap-4'>
            <DeleteIcon step={props.step} onClick={onDelete} />
            <EditIcon step={props.step} onClick={onEdit} />
          </div>
        )}
      </div>
    </button>
  );
}

interface DeleteIconProps {
  step: Step;
  onClick?: (stepId: number) => void;
}

function DeleteIcon(props: DeleteIconProps) {
  return (
    <Modal title='Delete step' trigger={<X size={14} className='cursor-pointer stroke-[#4E4E4E] hover:stroke-black' />}>
      <span>Are you sure you want to delete {props.step.title} step?</span>
      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <ActionButton icon={<Trash />} label='Delete' variant='primary' onClick={() => props.onClick?.(props.step.id)} />
      </div>
    </Modal>
  );
}

interface EditIconProps {
  step: Step;
  onClick?: (stepId: number, data: UpdateStepBody) => void;
}

function EditIcon(props: EditIconProps) {
  const [title, setTitle] = useState(props.step.title);
  const [icon, setIcon] = useState(props.step.icon);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(event.target.value);
  }

  return (
    <Modal title='Edit category' trigger={<Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />}>
      <span>Edit {props.step.title} category?</span>

      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='name' className='sr-only'>
            Title
          </Label>
          <Input
            id='name'
            name='name'
            value={title}
            onChange={handleTitleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Title'
          />
        </div>
        <div>
          <Label htmlFor='icon' className='sr-only'>
            Icon
          </Label>
          <Input
            id='icon'
            name='icon'
            value={icon}
            onChange={handleIconChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Icon'
          />
        </div>
      </div>

      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <DialogClose asChild>
          <ActionButton icon={<Save />} label='Save' variant='primary' onClick={() => props.onClick?.(props.step.id, { icon, title })} />
        </DialogClose>
      </div>
    </Modal>
  );
}
