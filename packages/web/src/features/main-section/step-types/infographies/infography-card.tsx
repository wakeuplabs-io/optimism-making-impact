import { ActionButton } from '@/components/action-button';
import { EditableText } from '@/components/editable-text';
import { Modal } from '@/components/modal';
import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';
import { DialogClose } from '@radix-ui/react-dialog';
import { Trash, X } from 'lucide-react';
import { useState } from 'react';

interface InfogrpahyCardProps {
  infography: Infography;
  order: number;
  isAdmin?: boolean;
  onDelete?: (infographyId: number) => void;
}

export function InfographyCard(props: InfogrpahyCardProps) {
  const [markdown, setMarkdown] = useState(props.infography.markdown);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMarkdown = e.target.value;
    setMarkdown(newMarkdown);
  };

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-between gap-4 rounded-[10px] p-4 lg:flex-row lg:gap-24',
        props.order % 2 === 0 && 'lg:flex-row-reverse',
        props.isAdmin && 'border border-[#BEBEBE]',
      )}
    >
      <div className='flex aspect-square max-h-[345px] w-full max-w-[345px] items-center justify-center'>
        <img className='h-full w-full rounded-full object-fill object-center' src={props.infography.image} alt='' />
      </div>
      <div className='flex w-screen max-w-[500px] flex-[2] items-center'>
        <EditableText value={markdown} isAdmin={props.isAdmin} onChange={handleTextareaChange} />
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
      title='Delete infography'
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
