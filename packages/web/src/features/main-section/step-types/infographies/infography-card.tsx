import { HoverOverlay } from '@/components/hover-overlay';
import { ImageWithDefault } from '@/components/image-with-default';
import { DeleteInfogrpahyModal } from '@/features/main-section/step-types/infographies/delete-infography-modal';
import { EditInfogrpahyImageModal } from '@/features/main-section/step-types/infographies/edit-infography-img-modal';
import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { EditInfographyMarkdown } from './edit-infography-markdown';

interface InfogrpahyCardProps {
  infography: Infography;
  order: number;
  isAdmin?: boolean;
  onDelete?: (infographyId: number) => void;
  onChangeText?: (infographyId: number, markdown: string) => void;
  onChangeImage?: (infographyId: number, image: string) => void;
}

export function InfographyCard(props: InfogrpahyCardProps) {
  const [editImgModalOpen, setEditImgModalOpen] = useState(false);
  const handleMarkdownChange = (newMarkdown: string) => {
    props.onChangeText?.(props.infography.id, newMarkdown);
  };

  return (
    <div
      className={cn('relative flex w-full flex-col items-center justify-center rounded-[10px] gap-12 lg:flex-row xl:gap-40 ', {
        'lg:flex-row-reverse': props.order % 2 === 0,
        'border border-[#BEBEBE] p-6 lg:px-20 lg:py-6': props.isAdmin,
        'lg:p-4': !props.isAdmin,
      })}
    >
      <HoverOverlay
        disabled={!props.isAdmin}
        overlayClassName='rounded-full bg-black bg-opacity-50'
        className='flex aspect-square w-full max-w-[238px] max-h-[238px] lg:max-h-[345px] lg:max-w-[345px] items-center justify-center rounded-full'
        overlayContent={
          <div className='flex items-center justify-center w-full h-full cursor-pointer' onClick={() => setEditImgModalOpen(true)}>
            <Pencil className='text-white hover:text-gray-400' />
          </div>
        }
      >
        <ImageWithDefault
          className='object-fill object-center w-full h-full rounded-full'
          src={props.infography.image}
          defaultImgClassname='rounded-full'
        />
      </HoverOverlay>
      <EditInfographyMarkdown
        isAdmin={props.isAdmin}
        markdown={props.infography.markdown}
        onChange={handleMarkdownChange}
        className='h-full w-full lg:max-w-[500px]'
      />
      {props.isAdmin && (
        <div className='absolute right-5 top-5 '>
          <DeleteInfogrpahyModal infography={props.infography} onClick={props.onDelete} />
        </div>
      )}
      {props.isAdmin && editImgModalOpen && (
        <EditInfogrpahyImageModal
          infography={props.infography}
          onClick={props.onChangeImage}
          open={editImgModalOpen}
          onClose={() => setEditImgModalOpen(false)}
        />
      )}
    </div>
  );
}
