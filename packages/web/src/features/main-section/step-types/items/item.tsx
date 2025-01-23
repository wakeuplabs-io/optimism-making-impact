import { cn, getColor } from '@/lib/utils';
import { CompleteItem } from '@/types/items';

interface ItemProps {
  item: CompleteItem;
}

export default function Item(props: ItemProps) {
  const color = getColor(props.item.color);
  return (
    <div className='flex items-start gap-3'>
      <div className={cn('mt-2 h-2 w-2 rounded-full')} style={{ backgroundColor: color }} />
      <span className='flex-1 font-[300]'>{props.item.markdown}</span>
    </div>
  );
}
