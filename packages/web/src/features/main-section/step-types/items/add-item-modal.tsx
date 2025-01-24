import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { CreateItemBody } from '@/services/items/schemas';
import { Attribute } from '@/types';
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';

interface AddAttributeButtonProps {
  attributes: Attribute[];
  stepId: number;
  onClick: (data: CreateItemBody) => void;
}

export function AddItemModal(props: AddAttributeButtonProps) {
  return <AddModal {...props} />;
}

interface AddSmartListModalProps {
  attributes: Attribute[];
  stepId: number;
  onClick: (data: CreateItemBody) => void;
}

function AddModal(props: AddSmartListModalProps) {
  const [markdown, setMarkdown] = useState('');
  const [attributeId, setAttributeId] = useState<number | undefined>(undefined);

  function clearForm() {
    setMarkdown('');
    setAttributeId(undefined);
  }

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMarkdown(event.target.value);
  }
  function handleAttributeChange(value: string) {
    const attributeId = Number(value);
    setAttributeId(attributeId);
  }

  function handleSubmit() {
    props.onClick({ markdown, attributeId, stepId: props.stepId });

    clearForm();
  }

  return (
    <Modal
      onOpenChange={clearForm}
      title='Add item'
      trigger={<IconButton icon={<Plus />} variant='secondary' className='h-[35px] w-[35px]' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: !attributeId, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='content' value={markdown} onChange={handleValueChange} placeholder='Content' />
        <SelectInput
          name='attributeId'
          items={props.attributes.map((a) => ({ value: a.id.toString(), label: a.value }))}
          onValueChange={handleAttributeChange}
          placeholder='Select an attribute'
        />
      </div>
    </Modal>
  );
}
