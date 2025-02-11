import { ColorDot } from '@/components/color-dot';
import { MarkdownText } from '@/components/markdown-text';
import { DeleteItemModal } from '@/features/main-section/step-types/items/delete-item-modal';
import { UpdateItemModal } from '@/features/main-section/step-types/items/update-item-modal';
import { UpdateItemBody } from '@/services/items/schemas';
import { CompleteItem } from '@/types/items';

interface ItemProps {
  item: CompleteItem;
  isAdmin?: boolean;
  onEdit: (itemId: number, data: UpdateItemBody) => void;
  onDelete: (itemId: number) => void;
}

export function Item(props: ItemProps) {
  return (
    <div className='flex items-start gap-3'>
      <ColorDot color={props.item.attribute.color} className='mt-2' />
      <MarkdownText className={'w-full overflow-auto break-words'}>{props.item.markdown}</MarkdownText>
      {props.isAdmin && (
        <div className='flex items-center self-center gap-2'>
          <UpdateItemModal item={props.item} onClick={props.onEdit} />
          <DeleteItemModal item={props.item} onClick={props.onDelete} />
        </div>
      )}
    </div>
  );
}
