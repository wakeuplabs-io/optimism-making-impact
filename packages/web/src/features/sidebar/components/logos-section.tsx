import RetroList from '@/assets/retro-list.png';
import VoteHere from '@/assets/vote-here.png';
import { ActionButton } from '@/components/action-button';
import { ImageButton } from '@/components/image-button';
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { Round, useSidebarStore, useUserStore } from '@/state';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';

export default function LogosSection() {
  const { selectedRound, editRound } = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <div className='flex w-full flex-col gap-4'>
      <SidebarImageButton
        src={VoteHere}
        selectedRound={selectedRound}
        isAdmin={isAdmin}
        onEdit={(newLink: string) => editRound(selectedRound.id, { link1: newLink })}
        linkNumber={1}
      />
      <SidebarImageButton
        src={RetroList}
        selectedRound={selectedRound}
        isAdmin={isAdmin}
        onEdit={(newLink: string) => editRound(selectedRound.id, { link2: newLink })}
        linkNumber={2}
      />
    </div>
  );
}

interface SidebarImageButtonProps {
  isAdmin: boolean;
  selectedRound: Round;
  onEdit: (link: string) => void;
  linkNumber: 1 | 2;
  src: string;
}

function SidebarImageButton(props: SidebarImageButtonProps) {
  return (
    <div className='relative'>
      {props.isAdmin && <EditIcon round={props.selectedRound} onEdit={props.onEdit} linkNumber={props.linkNumber} />}
      <a href={props.selectedRound.link1} target='_blank' rel='noreferrer'>
        <ImageButton src={props.src} isAdmin={props.isAdmin} />
      </a>
    </div>
  );
}

interface EditIconProps {
  round: Round;
  onEdit?: (link: string) => void;
  linkNumber: 1 | 2;
}

function EditIcon(props: EditIconProps) {
  const [newLink, setNewLink] = useState(props.linkNumber === 1 ? props.round.link1 : props.round.link2);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewLink(event.target.value);
  }

  return (
    <Modal
      title='Edit link'
      trigger={<Pencil size={18} className='absolute right-2 top-2 z-50 cursor-pointer stroke-[#4E4E4E] hover:stroke-black' />}
    >
      <span>
        Edit {props.round.name} link number {props.linkNumber}?
      </span>

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
        <ActionButton icon={<Save />} label='Save' variant='primary' onClick={() => props.onEdit?.(newLink)} />
      </div>
    </Modal>
  );
}
