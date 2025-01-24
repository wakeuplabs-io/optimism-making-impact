import Item from '@/features/main-section/step-types/items/item';
import { CompleteItem } from '@/types/items';
import React from 'react';

interface ItemsListProps {
  items: CompleteItem[];
  stepId: number;
  title: string;
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
  title: string;
}

function List(props: ListProps) {
  return (
    <div className='flex flex-col flex-1 p-2'>
      <div className='flex items-center h-12'>
        <h2 className='text-[20px] font-[500]'>{props.title}</h2>
      </div>
      <div className='flex flex-col w-full gap-4'>
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
