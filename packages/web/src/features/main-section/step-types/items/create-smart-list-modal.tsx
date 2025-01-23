import { ActionButton } from '@/components/action-button';
import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { CreateSmartListBody } from '@/services/smart-lists/schemas';
import { Save } from 'lucide-react';
import { useState } from 'react';

interface CreateSmartListButtonProps {
  stepId: number;
  onClick: (data: CreateSmartListBody) => void;
}

export function CreateSmartListModal(props: CreateSmartListButtonProps) {
  return <AddSmartListModal {...props} />;
}

interface AddSmartListModalProps {
  stepId: number;
  onClick: (data: CreateSmartListBody) => void;
}

function AddSmartListModal(props: AddSmartListModalProps) {
  const [title, setTitle] = useState('');

  function clearForm() {
    setTitle('');
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleSubmit() {
    props.onClick({ stepId: props.stepId, title });

    clearForm();
  }

  return (
    <Modal
      onOpenChange={clearForm}
      title='Add Smart List'
      trigger={<ActionButton label='Create Smart List' variant='secondary' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='title' value={title} onChange={handleTitleChange} placeholder='Smart list title' />
      </div>
    </Modal>
  );
}
