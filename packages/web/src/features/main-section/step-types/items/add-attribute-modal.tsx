import { IconButton } from '@/components/icon-button';
import { ColorSelectInput } from '@/components/inputs/color-select-input';
import { Modal } from '@/components/modal';
import { TextAreaInput } from '@/components/text-area-input';
import { TextInput } from '@/components/text-input';
import { Color, CreateAttributeBody } from '@optimism-making-impact/schemas';
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';

interface AddAttributeModalProps {
  smartListId: number;
  onClick: (data: CreateAttributeBody) => void;
}

export function AddAttributeModal(props: AddAttributeModalProps) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState<Color>('RED');

  function clearForm() {
    setValue('');
    setDescription('');
    setColor('RED');
  }

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function handleSubmit() {
    props.onClick({ smartListId: props.smartListId, value, color, description });

    clearForm();
  }

  return (
    <Modal
      onOpenChange={clearForm}
      title='Add attribute to Smart List'
      trigger={<IconButton icon={<Plus />} variant='secondary' className='h-[35px] w-[35px]' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='title' value={value} onChange={handleValueChange} placeholder='Title' />
        <TextAreaInput name='description' value={description} onChange={handleDescriptionChange} placeholder='Description' />
        <ColorSelectInput selected={color} onChange={setColor} />
      </div>
    </Modal>
  );
}
