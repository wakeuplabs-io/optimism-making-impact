import { EditInfographicMarkdown } from './edit-infography-markdown';
import { HoverOverlay } from '@/components/hover-overlay';
import { ImageWithDefault } from '@/components/image-with-default';
import { DeleteInfographicModal } from '@/features/main-section/step-types/infographies/delete-infography-modal';
import { EditInfographicImageModal } from '@/features/main-section/step-types/infographies/edit-infography-img-modal';
import { cn } from '@/lib/utils';
import { Infographic } from '@/types/infographies';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface InfographicCardProps {
  infographic: Infographic;
  order: number;
  isAdmin?: boolean;
  onDelete?: (infographicId: number) => void;
  onChangeText?: (infographicId: number, markdown: string) => void;
  onChangeImage?: (infographicId: number, image: string) => void;
}

export function InfographicCard(props: InfographicCardProps) {
  const [editImgModalOpen, setEditImgModalOpen] = useState(false);
  const handleMarkdownChange = (newMarkdown: string) => {
    props.onChangeText?.(props.infographic.id, newMarkdown);
  };

  return (
    <div
      className={cn('relative flex w-full flex-col items-center justify-center gap-12 rounded-[10px] lg:flex-row xl:gap-40', {
        'lg:flex-row-reverse': props.order % 2 === 0,
        'border border-[#BEBEBE] p-6 lg:px-20 lg:py-6': props.isAdmin,
        'lg:p-4': !props.isAdmin,
      })}
    >
      <HoverOverlay
        disabled={!props.isAdmin}
        overlayClassName='rounded-full bg-black bg-opacity-50'
        className='flex aspect-square max-h-[238px] w-full max-w-[238px] items-center justify-center rounded-full lg:max-h-[345px] lg:max-w-[345px]'
        overlayContent={
          <div className='flex h-full w-full cursor-pointer items-center justify-center' onClick={() => setEditImgModalOpen(true)}>
            <Pencil className='text-white hover:text-gray-400' />
          </div>
        }
      >
        <ImageWithDefault
          className='h-full w-full rounded-full object-fill object-center'
          src={props.infographic.image}
          defaultImgClassname='rounded-full'
        />
      </HoverOverlay>
      <div className='flex h-full w-full items-center lg:px-0'>
        <EditInfographicMarkdown isAdmin={props.isAdmin} markdown={props.infographic.markdown} onChange={handleMarkdownChange} />
      </div>
      {props.isAdmin && (
        <div className='absolute right-5 top-5'>
          <DeleteInfographicModal infographic={props.infographic} onClick={props.onDelete} />
        </div>
      )}
      {props.isAdmin && editImgModalOpen && (
        <EditInfographicImageModal
          infographic={props.infographic}
          onClick={props.onChangeImage}
          open={editImgModalOpen}
          onClose={() => setEditImgModalOpen(false)}
        />
      )}
    </div>
  );
}
