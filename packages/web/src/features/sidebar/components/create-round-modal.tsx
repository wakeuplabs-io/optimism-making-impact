import { Modal } from '@/components/modal';
import { SidebarModalAddTrigger } from '@/features/sidebar/components/sidebar-modal-add-trigger';
import { useToggle } from 'usehooks-ts';

interface CreateRoundModalProps {
  onSave: () => void;
}

export function CreateRoundModal(props: CreateRoundModalProps) {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <SidebarModalAddTrigger label='New Round' onClick={toggleOpen} />
      <Modal
        title='New round'
        open={isOpen}
        onOpenChange={toggleOpen}
        buttons={[{ label: 'Create', variant: 'primary', onClick: () => props.onSave() }]}
      >
        <span>You are about to create a new round. Are you sure?</span>
      </Modal>
    </>
  );
}
