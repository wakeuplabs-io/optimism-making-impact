import { Modal } from '@/components/modal';
import { CompleteItem } from '@/types';
import { Trash, X } from 'lucide-react';

interface DeleteItemModalProps {
  item: CompleteItem;
  onClick: (itemId: number) => void;
}

export function DeleteItemModal(props: DeleteItemModalProps) {
  function handleSubmit() {
    props.onClick(props.item.id);
  }

  return (
    <Modal
      title='Delete item'
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
      <span>Are you sure you want to delete this item?</span>
    </Modal>
  );
}
