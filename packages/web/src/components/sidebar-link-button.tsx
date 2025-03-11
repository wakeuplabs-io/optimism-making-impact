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
    <div
      className={cn(
        'relative',
        {
          'h-16': props.isAdmin,
        },
        props.className,
      )}
    >
      {props.isAdmin && <EditLink onClick={props.onClick} link={props.link} />}
      <a href={props.link} target='_blank' rel='noreferrer'>
        <ImageButton className='h-fit' src={props.src} />
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
      trigger={
        <button className='absolute mb-4 flex h-6 w-full items-end justify-center gap-2 rounded-b-xl bg-mi-stone-300 text-center text-sm text-slate-500 hover:underline'>
          edit
        </button>
      }
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
