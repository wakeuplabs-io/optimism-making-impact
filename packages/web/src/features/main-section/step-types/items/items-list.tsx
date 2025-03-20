import { DescriptionInlineText } from './description-inline-text';
import { EmptyState, NoAttributesEmptyState } from './empty-state';
import { AddItemModal } from '@/features/main-section/step-types/items/add-item-modal';
import { useItemsStepContext } from '@/features/main-section/step-types/items/context/use-items-step-context';
import { Item } from '@/features/main-section/step-types/items/item';
import { useStepQueries } from '@/hooks/use-step';
import { useUser } from '@/hooks/use-user';
import { CompleteItem } from '@/types/items';
import { Attribute } from '@optimism-making-impact/schemas';
import React, { useMemo } from 'react';

// TODO: for now, should extract logic
function filterItem(data: CompleteItem, selectedAttributes: Attribute[]): boolean {
  return !selectedAttributes.length || selectedAttributes.some(({ id }) => data.attribute?.id === id);
}

interface ItemsListProps {
  editStepDescription: (description: string) => void;
}

export function ItemsList({ editStepDescription }: ItemsListProps) {
  const { isAdminModeEnabled: isAdmin } = useUser();
  const { addItem } = useStepQueries();

  const { attributes, selectedAttributes, step } = useItemsStepContext();

  // TODO: for now, should extract logic
  const filteredItems = useMemo(() => step.items.filter((item) => filterItem(item, selectedAttributes)), [step.items, selectedAttributes]);

  const hasAttributes = !!attributes && attributes.length > 0;

  return (
    <div className='flex h-fit flex-1 flex-col rounded-[22px] bg-white p-8'>
      <div className='mb-6 flex items-start justify-between gap-4 border-b border-[#D9D9D9] pb-3'>
        <DescriptionInlineText description={step.description || ''} onChange={editStepDescription} isAdmin={isAdmin} />
        {isAdmin && hasAttributes && <AddItemModal onClick={addItem} />}
      </div>
      {hasAttributes ? <List items={filteredItems} /> : <NoAttributesEmptyState />}
    </div>
  );
}

interface ListProps {
  items: CompleteItem[];
}

function List(props: ListProps) {
  const { isAdminModeEnabled: isAdmin } = useUser();
  const { updateItem, deleteItem } = useStepQueries();

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
