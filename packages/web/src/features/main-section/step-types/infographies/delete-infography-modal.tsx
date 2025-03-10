import { Modal } from '@/components/modal';
import { Infographic } from '@/types/infographies';
import { Trash, X } from 'lucide-react';

interface DeleteInfographicModalProps {
  infographic: Infographic;
  onClick?: (stepId: number) => void;
}

export function DeleteInfographicModal(props: DeleteInfographicModalProps) {
  return (
    <Modal
      title='Delete infographic'
      trigger={<X size={22} className='cursor-pointer stroke-[#7D7D7D] hover:stroke-black' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onClick?.(props.infographic.id) },
      ]}
    >
      <span>Are you sure you want to delete this infographic?</span>
    </Modal>
  );
}
