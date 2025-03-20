import { DeleteInfographicModal } from './delete-infographic-modal';
import { EditInfographicImageModal } from './edit-infographic-img-modal';
import { EditInfographicMarkdown } from './edit-infographic-markdown';
import { HoverOverlay } from '@/components/hover-overlay';
import { EditIcon } from '@/components/icons/edit-icon';
import { cn } from '@/lib/utils';
import { Infographic } from '@optimism-making-impact/schemas';
import { useState } from 'react';

interface InfographicCardProps {
  infographic: Infographic;
  order: number;
  isAdmin?: boolean;
}

export function InfographicCard(props: InfographicCardProps) {
  const [editImgModalOpen, setEditImgModalOpen] = useState(false);

  return (
    <div
      className={cn('relative flex w-full flex-col items-center justify-center gap-6 rounded-[10px] xl:flex-row xl:gap-12', {
        'xl:flex-row-reverse': props.order % 2 === 0,
        'border border-[#BEBEBE] p-3 xl:gap-4 xl:p-4': props.isAdmin,
      })}
    >
      <HoverOverlay
        disabled={!props.isAdmin}
        overlayClassName='bg-black bg-opacity-50 rounded-xl'
        className='flex aspect-square h-[274px] w-full items-center justify-center xl:h-[320px] xl:w-1/2'
        overlayContent={
          <div className='flex h-full w-full cursor-pointer items-center justify-center' onClick={() => setEditImgModalOpen(true)}>
            <EditIcon className='text-white hover:text-gray-400' />
          </div>
        }
      >
        <img className='h-full rounded-xl object-fill object-center' src={props.infographic.image} />
      </HoverOverlay>
      <div className='flex h-full w-full items-center xl:w-1/2 xl:px-0'>
        <EditInfographicMarkdown isAdmin={props.isAdmin} infographic={props.infographic} />
      </div>
      {props.isAdmin && <DeleteInfographicModal infographic={props.infographic} />}
      {props.isAdmin && editImgModalOpen && (
        <EditInfographicImageModal infographic={props.infographic} open={editImgModalOpen} onClose={() => setEditImgModalOpen(false)} />
      )}
    </div>
  );
}
