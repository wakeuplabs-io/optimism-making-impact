import { ActionButton } from '@/components/action-button';
import { EditableText } from '@/components/editable-text';
import { HoverOverlay } from '@/components/hover-overlay';
import { ImageWithDefault } from '@/components/image-with-default';
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Pencil, Save, Trash, X } from 'lucide-react';
import { useState } from 'react';

interface InfogrpahyCardProps {
  infography: Infography;
  order: number;
  isAdmin?: boolean;
  onDelete?: (infographyId: number) => void;
  onChangeText?: (infographyId: number, markdown: string) => void;
  onEditImage?: (infographyId: number, image: string) => void;
}

export function InfographyCard(props: InfogrpahyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChangeText?.(props.infography.id, e.target.value);
  };

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-between gap-4 rounded-[10px] p-4 lg:flex-row lg:gap-24',
        props.order % 2 === 0 && 'lg:flex-row-reverse',
        props.isAdmin && 'border border-[#BEBEBE]',
      )}
    >
      <HoverOverlay
        overlayClassName='rounded-full bg-black bg-opacity-50'
        className='flex aspect-square max-h-[345px] w-full max-w-[345px] items-center justify-center rounded-full'
        overlayContent={
          <div className='flex h-full w-full cursor-pointer items-center justify-center' onClick={() => setModalOpen(true)}>
            <Pencil className='text-white hover:text-gray-400' />
          </div>
        }
      >
        <ImageWithDefault
          className='h-full w-full rounded-full object-fill object-center'
          src={props.infography.image}
          defaultImgClassname='rounded-full'
        />
      </HoverOverlay>
      <div className='flex w-screen max-w-[500px] flex-[2] items-center px-4 lg:px-0'>
        <EditableText value={props.infography.markdown} isAdmin={props.isAdmin} onChange={handleTextareaChange} />
      </div>
      {props.isAdmin && <DeleteIcon infography={props.infography} onClick={props.onDelete} />}
      {modalOpen && (
        <EditImageModal infography={props.infography} onClick={props.onEditImage} open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
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

interface EditImageModalProps {
  open: boolean;
  infography: Infography;
  onClick?: (stepId: number, image: string) => void;
  onClose?: () => void;
}

function EditImageModal(props: EditImageModalProps) {
  const [image, setImage] = useState(props.infography.image);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.value);
  }

  return (
    <Modal title='Edit image' open={props.open}>
      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='image' className='sr-only'>
            Image
          </Label>
          <Input
            id='image'
            name='image'
            value={image}
            onChange={handleTitleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Image'
          />
        </div>
      </div>

      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' onClick={props.onClose} />
        </DialogClose>
        <DialogClose asChild>
          <ActionButton
            icon={<Save />}
            label='Save'
            variant='primary'
            onClick={() => {
              props.onClick?.(props.infography.id, image);
              props.onClose?.();
            }}
          />
        </DialogClose>
      </div>
    </Modal>
  );
}
