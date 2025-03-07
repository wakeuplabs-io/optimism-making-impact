import { Modal } from '@/components/modal';
import { Infography } from '@/types/infographies';
import { Trash, X } from 'lucide-react';

interface DeleteInfogrpahyModalProps {
  infography: Infography;
  onClick?: (stepId: number) => void;
}

export function DeleteInfogrpahyModal(props: DeleteInfogrpahyModalProps) {
  return (
    <Modal
      title='Delete infography'
      trigger={<X size={22} className='cursor-pointer stroke-[#7D7D7D] hover:stroke-black' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onClick?.(props.infography.id) },
      ]}
    >
      <span>Are you sure you want to delete this infography?</span>
    </Modal>
  );
}
