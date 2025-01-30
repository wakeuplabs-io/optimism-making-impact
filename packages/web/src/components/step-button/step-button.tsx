import { IconWithDefault } from '@/components/icon-with-default';
import { Modal } from '@/components/modal';
import { StepButtonState } from '@/components/step-button/helpers';
import { TextInput } from '@/components/text-input';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { Pencil, Save, Trash, X } from 'lucide-react';
import { useState } from 'react';

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
      <div className='flex items-center max-w-full gap-2'>
        <div>
          <IconWithDefault src={props.step.icon} />
        </div>

        {!isMobile && <div className='flex-1 text-left truncate'>{props.step.title}</div>}

        {showActionIcons && (
          <div className='flex gap-4 ml-1'>
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
    <Modal
      title='Delete step'
      trigger={<X size={14} className='cursor-pointer stroke-[#4E4E4E] hover:stroke-black' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onClick?.(props.step.id) },
      ]}
    >
      <span>Are you sure you want to delete {props.step.title} step?</span>
    </Modal>
  );
}

interface EditIconProps {
  step: Step;
  onClick?: (stepId: number, data: UpdateStepBody) => void;
}

// TODO: move to features folder
function EditIcon(props: EditIconProps) {
  const [title, setTitle] = useState(props.step.title);
  const [icon, setIcon] = useState(props.step.icon);
  const [description, setDescription] = useState(props.step.description);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  return (
    <Modal
      title='Edit step'
      trigger={<Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', onClick: () => {} },
        { label: 'Save', variant: 'primary', onClick: () => props.onClick?.(props.step.id, { title, icon, description }), icon: <Save /> },
      ]}
    >
      <span>Edit {props.step.title} step?</span>

      <div className='grid gap-4 py-4'>
        <TextInput name='Title' value={title} onChange={handleTitleChange} />
        <TextInput name='Icon' value={icon} onChange={handleIconChange} />
        {props.step.type === 'ITEMS' && <TextInput name='Description' value={description} onChange={handleDescriptionChange} />}
      </div>
    </Modal>
  );
}
