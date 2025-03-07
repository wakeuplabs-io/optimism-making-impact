import { Modal } from '@/components/modal';
import { SidebarModalAddTrigger } from '@/features/sidebar/components/sidebar-modal-add-trigger';
import { Plus } from 'lucide-react';

interface CreateRoundModalProps {
  onSave: () => void;
}

export function CreateRoundModal(props: CreateRoundModalProps) {
  return (
    <Modal
      title='New round'
      trigger={<SidebarModalAddTrigger label='New Round' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', icon: <Plus />, onClick: () => props.onSave() },
      ]}
    >
      <span>You are about to create a new round. Are you sure?</span>
    </Modal>
  );
}
