import { Modal } from '@/components/modal';
import { Infographic } from '@/types/infographics';
import { Trash } from 'lucide-react';

interface DeleteInfographicModalProps {
  infographic: Infographic;
  onClick?: (stepId: number) => void;
}

export function DeleteInfographicModal(props: DeleteInfographicModalProps) {
  return (
    <Modal
      title='Delete infographic'
      trigger={<Trash className='w-[24px] h-[24px] cursor-pointer stroke-[#7D7D7D] hover:stroke-black' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onClick?.(props.infographic.id) },
      ]}
    >
      <span>Are you sure you want to delete this infographic?</span>
    </Modal>
  );
}
