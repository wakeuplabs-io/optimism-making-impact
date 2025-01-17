import { ActionButton } from '@/components/action-button';
import { Modal } from '@/components/modal';
import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';
import { DialogClose } from '@radix-ui/react-dialog';
import { Trash, X } from 'lucide-react';

interface InfogrpahyCardProps {
  infography: Infography;
  order: number;
  isAdmin?: boolean;
  onDelete?: (infographyId: number) => void;
}

export function InfographyCard(props: InfogrpahyCardProps) {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-between gap-4 p-4 lg:flex-row lg:gap-24',
        props.order % 2 === 0 && 'lg:flex-row-reverse',
      )}
    >
      <div className='flex aspect-square max-h-[345px] w-full max-w-[345px] items-center justify-center'>
        <img className='h-full w-full rounded-full object-fill object-center' src={props.infography.image} alt='' />
      </div>
      <div className='flex max-w-[500px] flex-[2] items-center'>
        <span>{props.infography.markdown}</span>
      </div>
      {props.isAdmin && <DeleteIcon infography={props.infography} onClick={props.onDelete} />}
    </div>
  );
}

interface DeleteIconProps {
  infography: Infography;
  onClick?: (stepId: number) => void;
}

function DeleteIcon(props: DeleteIconProps) {
  return (
    <Modal
      title='Delete step'
      trigger={<X size={22} className='absolute right-5 top-5 cursor-pointer stroke-[#7D7D7D] hover:stroke-black' />}
    >
      <span>Are you sure you want to delete this infography?</span>
      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <DialogClose asChild>
          <ActionButton icon={<Trash />} label='Delete' variant='primary' onClick={() => props.onClick?.(props.infography.id)} />
        </DialogClose>
      </div>
    </Modal>
  );
}
