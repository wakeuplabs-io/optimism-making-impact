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

  const shouldReverse = props.order % 2 === 0;

  return (
    <div
      className={cn('flex w-full flex-col items-center justify-center rounded-[10px] gap-6 xl:flex-row xl:gap-12 ', {
        'border border-[#BEBEBE] p-3 xl:p-4 xl:gap-4': props.isAdmin,
      })}
    >
      <HoverOverlay
        disabled={!props.isAdmin}
        overlayClassName='bg-black bg-opacity-50 rounded-xl'
        className={cn('flex aspect-square w-full xl:w-1/2 h-[274px] xl:h-[320px] items-center justify-center', {
          'xl:order-2': shouldReverse,
          'xl:order-1': !shouldReverse,
        })}
        overlayContent={
          <div className='flex items-center justify-center w-full h-full cursor-pointer' onClick={() => setEditImgModalOpen(true)}>
            <EditIcon className='text-white hover:text-gray-400' />
          </div>
        }
      >
        <ImageWithDefault className='object-fill object-center h-full rounded-xl' src={props.infographic.image} />
      </HoverOverlay>
      <div
        className={cn('flex items-center h-full w-full xl:w-1/2 xl:px-0', {
          'xl:order-1': shouldReverse,
          'xl:order-2': !shouldReverse,
        })}
      >
        <EditInfographicMarkdown isAdmin={props.isAdmin} infographic={props.infographic} />
      </div>
      {props.isAdmin && (
        <div className='xl:order-3'>
          <DeleteInfographicModal infographic={props.infographic} />
        </div>
      )}
      {props.isAdmin && editImgModalOpen && (
        <EditInfographicImageModal infographic={props.infographic} open={editImgModalOpen} onClose={() => setEditImgModalOpen(false)} />
      )}
    </div>
  );
}
