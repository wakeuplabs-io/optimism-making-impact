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
    <div className='flex flex-1 flex-col p-2'>
      <div className='flex h-12 items-center'>
        <h2 className='text-[20px] font-[500]'>Questions you can ask</h2>
      </div>
      <div className='flex w-full flex-col gap-4'>
        {props.items.map((item, i) => (
          <React.Fragment key={`${item.id}-${i}`}>
            {i === 0 && <hr className='border-t border-[#D9D9D9]' />}
            <Item item={item} />
            <hr className='border-t border-[#D9D9D9]' />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
