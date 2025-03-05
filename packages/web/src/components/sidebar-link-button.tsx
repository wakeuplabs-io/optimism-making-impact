import { ActionButton } from '@/components/action-button';
import { ImageButton, ImageButtonProps } from '@/components/image-button';
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SidebarLinkButtonProps extends Pick<ImageButtonProps, 'src'> {
  link: string;
  onClick: (url: string) => void;
  isAdmin?: boolean;
  className?: string;
}

export function SidebarLinkButton(props: SidebarLinkButtonProps) {
  return (
    <div className={cn('relative', props.className)}>
      {props.isAdmin && <EditLink onClick={props.onClick} link={props.link} />}
      <a href={props.link} target='_blank' rel='noreferrer'>
        <ImageButton src={props.src} />
      </a>
    </div>
  );
}

interface EditLinkProps {
  onClick?: (link: string) => void;
  link: string;
}

function EditLink(props: EditLinkProps) {
  const [newLink, setNewLink] = useState(props.link);

  useEffect(() => setNewLink(props.link), [props.link]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewLink(event.target.value);
  }

  return (
    <Modal
      title='Edit link'
      subtitle='Click save when you are done.'
      triggerClassname='absolute w-full h-16 flex items-end justify-center gap-2 bg-mi-stone-300 rounded-b-xl '
      trigger={<span className='w-full text-center text-sm text-slate-500 hover:underline'>edit</span>}
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
        <DialogClose asChild>
          <ActionButton icon={<Save />} label='Save' variant='primary' onClick={() => props.onClick?.(newLink)} />
        </DialogClose>
      </div>
    </Modal>
  );
}
