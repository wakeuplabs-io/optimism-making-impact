import { AddItemModal } from '@/features/main-section/step-types/items/add-item-modal';
import Item from '@/features/main-section/step-types/items/item';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { Attribute } from '@/types';
import { CompleteItem } from '@/types/items';
import React from 'react';

interface ItemsListProps {
  items: CompleteItem[];
  stepId: number;
  title: string;
  attributes?: Attribute[];
}

export function ItemsList(props: ItemsListProps) {
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
  title: string;
  attributes?: Attribute[];
}

function List(props: ListProps) {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const addItem = useMainSectionStore((state) => state.addItem);
  return (
    <div className='flex flex-1 flex-col p-2'>
      <div className='mb-4 flex h-12 items-center justify-between border-b border-[#D9D9D9]'>
        <h2 className='text-[20px] font-[500]'>{props.title}</h2>
        {isAdmin && props.attributes && <AddItemModal stepId={props.stepId} onClick={addItem} attributes={props.attributes} />}
      </div>
      <div className='flex w-full flex-col gap-4'>
        {props.items.length === 0 ? (
          <EmptyState />
        ) : (
          props.items.map((item, i) => (
            <React.Fragment key={`${item.id}-${i}`}>
              <Item item={item} />
              <hr className='border-t border-[#D9D9D9]' />
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
