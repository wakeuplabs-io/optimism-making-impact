import { cn, getColor } from '@/lib/utils';
import { CompleteItem } from '@/types/items';

interface ItemProps {
  item: CompleteItem;
}

export default function Item(props: ItemProps) {
  const color = getColor(props.item.color);
  return (
    <div className='flex items-center gap-2'>
      <div className={cn('h-2 w-2 rounded-full')} style={{ backgroundColor: color }} />
      <span>{props.item.markdown}</span>
    </div>
  );
}
