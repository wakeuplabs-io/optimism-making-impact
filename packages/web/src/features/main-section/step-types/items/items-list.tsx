import Item from '@/features/main-section/step-types/items/item';
import { CompleteItem } from '@/types/items';
import React from 'react';

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
    <div className='flex h-full w-full items-center justify-center'>
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
    <div className='flex flex-1 flex-col'>
      <div className='flex w-full flex-col gap-4'>
        {props.items.map((item, i) => (
          <React.Fragment key={`${item.id}-${i}`}>
            {i === 0 && <hr className='border-t border-gray-300' />}
            <Item item={item} />
            <hr className='border-t border-gray-300' />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
