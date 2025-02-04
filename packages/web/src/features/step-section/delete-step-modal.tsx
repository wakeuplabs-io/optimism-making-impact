import { Modal } from '@/components/modal';
import { Step } from '@/types';
import { Trash, X } from 'lucide-react';

interface DeleteIconProps {
  step: Step;
  onClick?: (stepId: number) => void;
}

export function DeleteStepModal(props: DeleteIconProps) {
  return (
    <Modal
      title='Delete step'
      trigger={<X size={14} className='cursor-pointer stroke-[#4E4E4E] hover:stroke-black' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Delete', variant: 'primary', icon: <Trash />, onClick: () => props.onClick?.(props.step.id) },
      ]}
    >
      <span>Are you sure you want to delete {props.step.title} step?</span>
    </Modal>
  );
}
