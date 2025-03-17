import { ColorDot } from '@/components/color-dot';
import { UpdateItemModal } from '@/features/main-section/step-types/items/update-item-modal';
import { CompleteItem } from '@/types/items';
import { UpdateItemBody } from '@optimism-making-impact/schemas';
import Markdown from 'react-markdown';

interface ItemProps {
  item: CompleteItem;
  isAdmin?: boolean;
  onEdit: (itemId: number, data: UpdateItemBody) => void;
  onDelete: (itemId: number) => void;
}

export function Item(props: ItemProps) {
  return (
    <div className='flex items-start gap-3'>
      <ColorDot color={props.item.attribute?.color ?? 'GRAY'} className='mt-2' />
      <Markdown className='w-full overflow-auto break-words'>{props.item.markdown}</Markdown>
      {props.isAdmin && (
        <div className='flex items-center gap-2 self-center'>
          <UpdateItemModal item={props.item} onSave={props.onEdit} onDelete={(item) => props.onDelete(item.id)} />
        </div>
      )}
    </div>
  );
}
