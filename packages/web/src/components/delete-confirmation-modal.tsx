import { Modal } from '@/components/modal';
import { Trash } from 'lucide-react';

interface DeleteConfirmationModalProps {
  title: string;
  description: React.ReactNode;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
}

export function DeleteConfirmationModal(props: DeleteConfirmationModalProps) {
  return (
    <Modal
      trigger={props.trigger}
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
