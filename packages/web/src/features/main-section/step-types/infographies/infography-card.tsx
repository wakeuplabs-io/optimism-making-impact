import { EditableText } from '@/components/editable-text';
import { HoverOverlay } from '@/components/hover-overlay';
import { ImageWithDefault } from '@/components/image-with-default';
import { DeleteInfogrpahyModal } from '@/features/main-section/step-types/infographies/delete-infography-modal';
import { EditInfogrpahyImageModal } from '@/features/main-section/step-types/infographies/edit-infography-img-modal';
import { cn } from '@/lib/utils';
import { Infography } from '@/types/infographies';

interface InfogrpahyCardProps {
  infography: Infography;
  order: number;
  isAdmin?: boolean;
  onDelete?: (infographyId: number) => void;
  onChangeText?: (infographyId: number, markdown: string) => void;
  onEditImage?: (infographyId: number, image: string) => void;
}

export function InfographyCard(props: InfogrpahyCardProps) {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChangeText?.(props.infography.id, e.target.value);
  };

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-between gap-4 rounded-[10px] p-4 lg:flex-row lg:gap-24',
        props.order % 2 === 0 && 'lg:flex-row-reverse',
        props.isAdmin && 'border border-[#BEBEBE]',
      )}
    >
      <HoverOverlay
        overlayClassName='rounded-full bg-black bg-opacity-50'
        className='flex aspect-square max-h-[345px] w-full max-w-[345px] items-center justify-center rounded-full'
        overlayContent={
          <div className='flex h-full w-full cursor-pointer items-center justify-center'>
            <EditInfogrpahyImageModal infography={props.infography} onClick={props.onEditImage} />
          </div>
        }
      >
        <ImageWithDefault
          className='h-full w-full rounded-full object-fill object-center'
          src={props.infography.image}
          defaultImgClassname='rounded-full'
        />
      </HoverOverlay>
      <div className='flex w-screen max-w-[500px] flex-[2] items-center px-4 lg:px-0'>
        <EditableText value={props.infography.markdown} isAdmin={props.isAdmin} onChange={handleTextareaChange} />
      </div>
      {props.isAdmin && <DeleteInfogrpahyModal infography={props.infography} onClick={props.onDelete} />}
    </div>
  );
}
