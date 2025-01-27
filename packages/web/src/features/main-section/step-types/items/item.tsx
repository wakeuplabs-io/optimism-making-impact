import { DeleteItemModal } from '@/features/main-section/step-types/items/delete-item-modal';
import { UpdateItemModal } from '@/features/main-section/step-types/items/update-item-modal';
import { cn, getColor } from '@/lib/utils';
import { UpdateItemBody } from '@/services/items/schemas';
import { CompleteItem } from '@/types/items';

interface ItemProps {
  item: CompleteItem;
  isAdmin?: boolean;
  onEdit: (itemId: number, data: UpdateItemBody) => void;
  onDelete: (itemId: number) => void;
}

export default function Item(props: ItemProps) {
  const color = getColor(props.item.attribute.color);
  return (
    <div className='flex items-start gap-3'>
      <div className={cn('mt-2 h-2 w-2 rounded-full')} style={{ backgroundColor: color }} />
      <span className='flex-1 font-[300]'>{props.item.markdown}</span>
      {props.isAdmin && (
        <div className='flex items-center self-center gap-2'>
          <UpdateItemModal item={props.item} onClick={props.onEdit} />
          <DeleteItemModal item={props.item} onClick={props.onDelete} />
        </div>
      )}
    </div>
  );
}
