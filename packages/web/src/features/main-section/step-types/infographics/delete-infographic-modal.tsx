import { Modal } from '@/components/modal';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { Infographic } from '@optimism-making-impact/schemas';
import { Trash } from 'lucide-react';

interface DeleteInfographicModalProps {
  infographic: Infographic;
}

export function DeleteInfographicModal(props: DeleteInfographicModalProps) {
  const deleteInfographic = useMainSectionStore((state) => state.deleteInfographic);

  return (
    <Modal
      title='Delete infographic'
      trigger={<Trash className='w-[24px] h-[24px] cursor-pointer stroke-[#7D7D7D] hover:stroke-black' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => deleteInfographic(props.infographic.id) },
      ]}
    >
      <span>Are you sure you want to delete this infographic?</span>
    </Modal>
  );
}
