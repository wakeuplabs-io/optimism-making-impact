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
        <div className="flex flex-col items-center mt-2">
          <p>You are about to create a new round</p>
          <p>which will clone the latest round and it's links</p>
          <p>Are you sure?</p>
        </div>
      </Modal>
    </>
  );
}
