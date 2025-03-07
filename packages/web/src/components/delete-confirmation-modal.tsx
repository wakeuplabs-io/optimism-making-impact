import { BACKTONORMAL_Modal } from '@/components/modal2';
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
    <BACKTONORMAL_Modal
      open={props.isOpen}
      title={props.title}
      onOpenChange={props.onOpenChange}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onConfirm?.() },
      ]}
    >
      {props.description}
    </BACKTONORMAL_Modal>
  );
}
