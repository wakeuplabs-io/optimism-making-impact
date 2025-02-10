import { Modal } from '@/components/modal';
import { Step } from '@/types';
import { Trash } from 'lucide-react';

interface DeleteStepConfirmationModal {
  isOpen: boolean;
  step: Step;
  onOpenChange: (open: boolean) => void;
  onClick?: (stepId: number) => void;
}

// TODO: USE THIS CONFIRMATION SCREEN IN OTHER MODALS
export function DeleteStepConfirmationModal(props: DeleteStepConfirmationModal) {
  return (
    <Modal
      open={props.isOpen}
      title='Delete step'
      onOpenChange={props.onOpenChange}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onClick?.(props.step.id) },
      ]}
    >
      <span>Are you sure you want to delete {props.step.title} step?</span>
    </Modal>
  );
}
