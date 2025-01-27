import { Modal } from '@/components/modal';
import { Trash, X } from 'lucide-react';

interface DeleteAttributeModalProps {
  attributeId: number;
  onClick: (attributeId: number) => void;
}

export function DeleteAttributeModal(props: DeleteAttributeModalProps) {
  function handleSubmit() {
    props.onClick(props.attributeId);
  }

  return (
    <Modal
      title='Remove attribute from Smart List'
      trigger={
        <button>
          <X size={14} className='stroke-[#4E4E4E] hover:stroke-black' />
        </button>
      }
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', disabled: false, closeOnClick: true, icon: <Trash />, onClick: handleSubmit },
      ]}
    >
      <span>Are you sure you want to Remove this attribute from the Smart List?</span>
    </Modal>
  );
}
