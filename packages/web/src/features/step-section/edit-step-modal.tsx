import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { UpdateStepBody } from '@/services/steps/schemas';
import { Step } from '@/types';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';

interface EditIconProps {
  step: Step;
  onClick?: (stepId: number, data: UpdateStepBody) => void;
}

export function EditStepModal(props: EditIconProps) {
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
