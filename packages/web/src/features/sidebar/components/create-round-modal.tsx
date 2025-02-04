import { Modal } from '@/components/modal';
import { SidebarActionButton } from '@/components/sidebar-acion-button';
import { Plus } from 'lucide-react';

interface CreateRoundModalProps {
  onSave: () => void;
}

export function CreateRoundModal(props: CreateRoundModalProps) {
  return (
    <Modal
      title='New round'
      trigger={<SidebarActionButton label='New round' icon={<Plus size={12} className='font-bold text-white' />} />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', icon: <Plus />, onClick: () => props.onSave() },
      ]}
    >
      <span>You are about to create a new round. Are you sure?</span>
    </Modal>
  );
}
