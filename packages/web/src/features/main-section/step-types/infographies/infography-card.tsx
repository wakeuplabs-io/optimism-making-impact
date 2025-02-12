import { EditableText } from '@/components/editable-text';
import { HoverOverlay } from '@/components/hover-overlay';
import { ImageWithDefault } from '@/components/image-with-default';
import { DeleteInfogrpahyModal } from '@/features/main-section/step-types/infographies/delete-infography-modal';
import { EditInfogrpahyImageModal } from '@/features/main-section/step-types/infographies/edit-infography-img-modal';
import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

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
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChangeText?.(props.infography.id, e.target.value);
  };

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-between rounded-[10px] gap-12 lg:p-4 lg:flex-row lg:items-start xl:gap-40',
        props.order % 2 === 0 && 'lg:flex-row-reverse',
        props.isAdmin && 'border border-[#BEBEBE]',
      )}
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
      <div className='flex h-full w-full items-center lg:max-w-[500px] lg:px-0'>
        <EditableText value={props.infography.markdown} isAdmin={props.isAdmin} onChange={handleTextareaChange} />
      </div>
      {props.isAdmin && <DeleteInfogrpahyModal infography={props.infography} onClick={props.onDelete} />}
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
