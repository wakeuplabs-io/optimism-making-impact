import { Modal } from '@/components/modal';
import { Trash } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export function DeleteConfirmationModal(props: DeleteConfirmationModalProps) {
  return (
    <Modal
      open={props.isOpen}
      title={props.title}
      onOpenChange={props.onOpenChange}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onConfirm?.() },
      ]}
    >
      {props.description}
    </Modal>
  );
}
