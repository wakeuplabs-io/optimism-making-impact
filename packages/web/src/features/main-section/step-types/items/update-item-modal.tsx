import { ColorDot } from '@/components/color-dot';
import { SelectInput } from '@/components/inputs/select-input';
import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { UpdateItemBody } from '@/services/items/schemas';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteItem } from '@/types';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';

interface UpdateItemModalProps {
  item: CompleteItem;
  onClick: (itemId: number, data: UpdateItemBody) => void;
}

export function UpdateItemModal(props: UpdateItemModalProps) {
  const attributes = useMainSectionStore((state) => state.step?.smartList?.attributes);
  const [markdown, setMarkdown] = useState(props.item.markdown);
  const [attributeId, setAttributeId] = useState<number>(props.item.attributeId);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMarkdown(event.target.value);
  }

  function handleAttributeChange(value: string) {
    const attributeId = Number(value);
    setAttributeId(attributeId);
  }

  function handleSubmit() {
    props.onClick(props.item.id, { markdown, attributeId });
  }

  return (
    <Modal
      title='Edit item'
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
        <TextInput name='content' value={markdown} onChange={handleValueChange} placeholder='Content' />
        {attributes && (
          <SelectInput
            name='attributeId'
            items={attributes.map((a) => ({
              value: a.id.toString(),
              label: (
                <div className='flex items-center gap-2'>
                  <ColorDot color={a.color} />
                  <span>{a.value}</span>
                </div>
              ),
            }))}
            onValueChange={handleAttributeChange}
            value={attributeId.toString()}
            placeholder='Select an attribute'
          />
        )}
      </div>
    </Modal>
  );
}
