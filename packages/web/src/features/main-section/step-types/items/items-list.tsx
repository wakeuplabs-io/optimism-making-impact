import { DescriptionInlineText } from './description-inline-text';
import { EmptyState, NoAttributesEmptyState } from './empty-state';
import { AddItemModal } from '@/features/main-section/step-types/items/add-item-modal';
import { Item } from '@/features/main-section/step-types/items/item';
import { useFilteredData } from '@/features/main-section/use-filtered-data';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useUserStore } from '@/state/user-store/user-store';
import { CompleteItem } from '@/types/items';
import { CompleteStep } from '@/types/steps';
import { Attribute } from '@optimism-making-impact/schemas';
import React from 'react';

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

  const hasAttributes = !!attributes && attributes.length > 0;

  return (
    <div className='flex h-fit flex-1 flex-col rounded-[22px] bg-white p-8'>
      <div className='mb-6 flex gap-4 items-start justify-between border-b border-[#D9D9D9] pb-3'>
        <DescriptionInlineText description={step.description || ''} onChange={editStepDescription} isAdmin={isAdmin} />
        {isAdmin && hasAttributes && <AddItemModal stepId={step.id} onClick={addItem} attributes={attributes} />}
      </div>
      {hasAttributes ? <List items={filteredItems} /> : <NoAttributesEmptyState />}
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
