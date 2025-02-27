import { AddItemModal } from '@/features/main-section/step-types/items/add-item-modal';
import { Item } from '@/features/main-section/step-types/items/item';
import { useFilteredData } from '@/features/main-section/use-filtered-data';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteItem } from '@/types/items';
import { Attribute } from '@optimism-making-impact/schemas';
import React from 'react';
import { DescriptionInlineText } from './description-inline-text';
import { CompleteStep } from '@/types';

interface ItemsListProps {
  items: CompleteItem[];
  step: CompleteStep;
  editStepDescription: (description: string) => void;
  attributes?: Attribute[];
}

export function ItemsList({ items, step, editStepDescription, attributes }: ItemsListProps) {
  const { selectedStrengths, selectedKeywords, selectedAttributes } = useFiltersStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const addItem = useMainSectionStore((state) => state.addItem);

  const filteredItems = useFilteredData({ data: items, selectedStrengths, selectedKeywords, selectedAttributes });

  return (
    <div className='flex h-fit flex-1 flex-col rounded-[22px] bg-white p-8'>
      <div className='mb-6 flex items-start justify-between border-b border-[#D9D9D9] pb-3'>
        <DescriptionInlineText description={step.description} onChange={editStepDescription} isAdmin={isAdmin} />
        {isAdmin && attributes && <AddItemModal stepId={step.id} onClick={addItem} attributes={attributes} />}
      </div>
      <List items={filteredItems} />
    </div>
  );
}

interface ListProps {
  items: CompleteItem[];
}

function List(props: ListProps) {
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const updateItem = useMainSectionStore((state) => state.updateItem);
  const deleteItem = useMainSectionStore((state) => state.deleteItem);

  return (
    <div className='flex w-full flex-col gap-6'>
      {props.items.length === 0 ? (
        <EmptyState />
      ) : (
        props.items.map((item, i) => (
          <React.Fragment key={`${item.id}-${i}`}>
            <Item item={item} isAdmin={isAdmin} onEdit={updateItem} onDelete={deleteItem} />
            <hr className='border-t border-[#D9D9D9]' />
          </React.Fragment>
        ))
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <p>No item matches applied filters</p>
    </div>
  );
}
