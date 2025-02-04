import { DeleteIcon } from '@/components/icons/delete-icon';
import { Modal } from '@/components/modal';
import { CompleteCard } from '@/types';
import { Trash } from 'lucide-react';

interface AddCardModalProps {
  onClick?: (cardId: number) => void;
  card: CompleteCard;
}

export function DeleteCardButton(props: AddCardModalProps) {
  return (
    <Modal
      title='Edit card'
      trigger={<DeleteIcon />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', closeOnClick: true, icon: <Trash />, onClick: () => props.onClick?.(props.card.id) },
      ]}
    >
      <span>Are you sure you want to delete this card?</span>
    </Modal>
  );
}
