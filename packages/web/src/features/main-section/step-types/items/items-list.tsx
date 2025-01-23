import Item from '@/features/main-section/step-types/items/item';
import { CompleteItem } from '@/types/items';

interface ItemsListProps {
  items: CompleteItem[];
  stepId: number;
}

export function ItemsList(props: ItemsListProps) {
  if (!props.items.length) return <EmptyState />;

  return <List {...props} />;
}

function EmptyState() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <p>No item matches applied filters</p>
    </div>
  );
}

interface ListProps {
  items: CompleteItem[];
  stepId: number;
}

function List(props: ListProps) {
  return (
    <div className='flex flex-col flex-1'>
      <div className='flex flex-col w-full gap-4'>
        {props.items.map((item, i) => {
          return <Item item={item} key={`${item.id}-${i}`} />;
        })}
      </div>
    </div>
  );
}
