import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { Infographic } from '@optimism-making-impact/schemas';
import { Trash } from 'lucide-react';
interface DeleteInfographicModalProps {
  infographic: Infographic;
}

export function DeleteInfographicModal(props: DeleteInfographicModalProps) {
  const deleteInfographic = useMainSectionStore((state) => state.deleteInfographic);

  return (
    <DeleteConfirmationModal
      trigger={<Trash className='w-[24px] h-[24px] cursor-pointer stroke-[#7D7D7D] hover:stroke-black' />}
      title={`Delete Infographic`}
      description={<span>Are you sure you want to delete this infographic?</span>}
      onConfirm={() => deleteInfographic(props.infographic.id)}
    />
  );
}
