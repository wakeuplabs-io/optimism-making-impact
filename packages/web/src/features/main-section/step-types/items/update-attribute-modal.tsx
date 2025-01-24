import { ColorSelectInput } from '@/components/inputs/color-select-input';
import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { UpdateAttributeBody } from '@/services/attributes/schemas';
import { Attribute } from '@/types';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';

interface UpdateAttributeButtonProps {
  attribute: Attribute;
  onClick: (data: UpdateAttributeBody) => void;
}

export function UpdateAttributeModal(props: UpdateAttributeButtonProps) {
  return <UpdateModal {...props} />;
}

interface UpdateModalProps {
  attribute: Attribute;
  onClick: (data: UpdateAttributeBody) => void;
}

function UpdateModal(props: UpdateModalProps) {
  const [value, setValue] = useState(props.attribute.value);
  const [color, setColor] = useState(props.attribute.color);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    props.onClick({ id: props.attribute.id, value, color });
  }

  return (
    <Modal
      title='Edit attribute'
      trigger={
        <button>
          <Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />
        </button>
      }
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='title' value={value} onChange={handleValueChange} placeholder='Title' />
        <ColorSelectInput selected={color} onChange={setColor} />
      </div>
    </Modal>
  );
}
