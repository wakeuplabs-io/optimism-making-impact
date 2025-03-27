import { Modal } from '@/components/modal';
import { SidebarModalAddTrigger } from '@/features/sidebar/components/sidebar-modal-add-trigger';
import { useToggle } from 'usehooks-ts';

interface CreateRoundModalProps {
  isDisabled?: boolean;
  onSave: () => void;
}

export function CreateRoundModal({ isDisabled, onSave }: CreateRoundModalProps) {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <SidebarModalAddTrigger label='New Round' onClick={toggleOpen} isDisabled={isDisabled} />
      <Modal
        title='New round'
        open={isOpen}
        onOpenChange={toggleOpen}
        buttons={[{ label: 'Create', variant: 'primary', onClick: () => onSave() }]}
      >
        <span>You are about to create a new round. Are you sure?</span>
      </Modal>
    </>
  );
}
