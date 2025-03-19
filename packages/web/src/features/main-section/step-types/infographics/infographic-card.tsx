import { HoverOverlay } from '@/components/hover-overlay';
import { ImageWithDefault } from '@/components/image-with-default';
import { DeleteInfographicModal } from './delete-infographic-modal';
import { EditInfographicImageModal } from './edit-infographic-img-modal';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { EditInfographicMarkdown } from './edit-infographic-markdown';
import { EditIcon } from '@/components/icons/edit-icon';
import { Infographic } from '@optimism-making-impact/schemas';

interface InfographicCardProps {
  infographic: Infographic;
  order: number;
  isAdmin?: boolean;
}

export function InfographicCard(props: InfographicCardProps) {
  const [editImgModalOpen, setEditImgModalOpen] = useState(false);

  return (
    <div
      className={cn('relative flex w-full flex-col items-center justify-center rounded-[10px] gap-6 xl:flex-row xl:gap-12 ', {
        'xl:flex-row-reverse': props.order % 2 === 0,
        'border border-[#BEBEBE] p-3 xl:p-4 xl:gap-4': props.isAdmin,
      })}
    >
      <HoverOverlay
        disabled={!props.isAdmin}
        overlayClassName='bg-black bg-opacity-50 rounded-xl'
        className='flex aspect-square w-full xl:w-1/2 h-[274px] xl:h-[320px] items-center justify-center'
        overlayContent={
          <div className='flex items-center justify-center w-full h-full cursor-pointer' onClick={() => setEditImgModalOpen(true)}>
            <EditIcon className='text-white hover:text-gray-400' />
          </div>
        }
      >
        <ImageWithDefault className='object-fill object-center h-full rounded-xl' src={props.infographic.image} />
      </HoverOverlay>
      <div className='flex items-center h-full w-full xl:w-1/2 xl:px-0'>
        <EditInfographicMarkdown isAdmin={props.isAdmin} infographic={props.infographic} />
      </div>
      {props.isAdmin && <DeleteInfographicModal infographic={props.infographic} />}
      {props.isAdmin && editImgModalOpen && (
        <EditInfographicImageModal infographic={props.infographic} open={editImgModalOpen} onClose={() => setEditImgModalOpen(false)} />
      )}
    </div>
  );
}
