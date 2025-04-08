import { Modal } from '@/components/modal';
import { SidebarModalAddTrigger } from '@/features/sidebar/components/sidebar-modal-add-trigger';
import { AlertCircle } from 'lucide-react';
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
        buttons={[
          { label: 'Create', variant: 'primary', onClick: () => onSave() },
          { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        ]}
      >
        <div className='flex flex-col space-y-4 mb-6'>
          <p className='font-bold text-base  ml-[32px]'>You're about to create a new round.</p>

          <div className='flex items-start space-x-3 my-1'>
            <AlertCircle className='text-gray-500 mt-0.5 flex-shrink-0' size={20} />
            <p className='text-gray-600 text-sm '>This will duplicate the latest round along with all its associated links.</p>
          </div>

          <p className='font-bold text-base ml-[32px]'>Are you sure you want to proceed?</p>
        </div>
      </Modal>
    </>
  );
}
