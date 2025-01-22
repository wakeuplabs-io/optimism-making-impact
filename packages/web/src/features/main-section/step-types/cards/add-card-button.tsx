import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { Modal } from '@/components/modal';
import { TextAreaInput } from '@/components/text-area-input';
import { TextInput } from '@/components/text-input';
import { CreateCardBody } from '@/services/cards/schemas';
import { strengthArray, StrengthEnum } from '@/types';
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';

interface AddCardButtonProps {
  stepId: number;
  onClick?: (data: CreateCardBody) => void;
}

export function AddCardButton(props: AddCardButtonProps) {
  return <AddCardModal {...props} onClick={props.onClick} />;
}

interface AddCardModalProps {
  stepId: number;
  onClick?: (data: CreateCardBody) => void;
}

function AddCardModal(props: AddCardModalProps) {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [strength, setStrength] = useState(StrengthEnum.MEDIUM);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleMarkdownChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMarkdown(event.target.value);
  }
  function handleStrengthChange(value: string) {
    setStrength(value as StrengthEnum);
  }

  function handleSubmit() {
    props.onClick?.({
      title,
      markdown,
      stepId: props.stepId,
      keywords: [], // HARDCODED: for now
      strength,
    });
    setTitle('');
    setMarkdown('');
  }

  return (
    <Modal
      title='Add card'
      trigger={<IconButton variant='secondary' icon={<Plus />} />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='title' value={title} onChange={handleTitleChange} placeholder='Card title' />
        <TextAreaInput name='markdown' rows={7} value={markdown} onChange={handleMarkdownChange} placeholder='Card content' />
        {/* TODO: add select input for attributes */}
        <SelectInput
          value={strength}
          name='strength'
          items={strengthOptions}
          triggerClassName='capitalize'
          itemClassName='capitalize'
          onValueChange={handleStrengthChange}
        />
        {/* TODO: keywords */}
      </div>
    </Modal>
  );
}

const strengthOptions = strengthArray.map((item) => ({ label: item.toLowerCase(), value: item }));
