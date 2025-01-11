import { ActionButton } from '@/components/action-button';
import { ImageButton, ImageButtonProps } from '@/components/image-button';
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';

interface SidebarLinkButtonProps extends Pick<ImageButtonProps, 'isAdmin' | 'src'> {
  link: string;
  onClick: (url: string) => void;
}

export function SidebarLinkButton(props: SidebarLinkButtonProps) {
  return (
    <div className='relative'>
      {props.isAdmin && <EditIcon onClick={props.onClick} link={props.link} />}
      <a href={props.link} target='_blank' rel='noreferrer'>
        <ImageButton src={props.src} isAdmin={props.isAdmin} />
      </a>
    </div>
  );
}

interface EditIconProps {
  onClick?: (link: string) => void;
  link: string;
}

function EditIcon(props: EditIconProps) {
  const [newLink, setNewLink] = useState(props.link);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewLink(event.target.value);
  }

  return (
    <Modal
      title='Edit link'
      subtitle='Click save when you are done.'
      trigger={<Pencil size={18} className='absolute right-2 top-2 z-50 cursor-pointer stroke-[#4E4E4E] hover:stroke-black' />}
    >
      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='name' className='sr-only'>
            Title
          </Label>
          <Input
            id='name'
            name='name'
            value={newLink}
            onChange={handleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Name'
          />
        </div>
      </div>

      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <ActionButton icon={<Save />} label='Save' variant='primary' onClick={() => props.onClick?.(newLink)} />
      </div>
    </Modal>
  );
}
