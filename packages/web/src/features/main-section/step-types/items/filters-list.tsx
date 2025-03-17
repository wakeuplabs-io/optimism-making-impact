import { useItemsContext } from './items-context';
import { FilterGroup } from '@/components/filter-group/filter-group';
import { FilterGroupColorDot } from '@/components/filter-group/filter-group-icon';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { AddAttributeModal } from '@/features/main-section/step-types/items/add-attribute-modal';
import { UpdateAttributeModal } from '@/features/main-section/step-types/items/update-attribute-modal';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUser } from '@/hooks/use-user';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { Attribute } from '@optimism-making-impact/schemas';

export function ItemFilters() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='flex h-14 w-full items-center justify-end gap-4 px-4 lg:static'>
        <SideMenu trigger={<FiltersIcon size={24} />} description='Filters' side='right' className='w-[300px]'>
          {props.children}
        </SideMenu>
      </div>
    );
  }

  return <div className='flex h-fit max-w-[250px] rounded-[22px] bg-white px-8 py-6'>{props.children}</div>;
}

function Content() {
  const { isAdminModeEnabled: isAdmin } = useUser();
  const addAttributeToSmartList = useMainSectionStore((state) => state.addAttributeToSmartList);
  const updateAttribute = useMainSectionStore((state) => state.updateAttribute);
  const deleteAttribute = useMainSectionStore((state) => state.deleteAttribute);

  const { step, attributes, setSelectedAttribute, selectedAttributes } = useItemsContext();

  if (!step.smartListFilter) {
    return (
      <div className='flex w-full justify-center'>
        <span>There is no Smart List Filter for this step</span>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='flex items-center justify-between'>
        <span className='text-base font-semibold'>Filters</span>
        {isAdmin && <AddAttributeModal smartListFilterId={step.smartListFilter.id} onClick={addAttributeToSmartList} />}
      </div>
      <hr className='my-6 border-[#D9D9D9]' />
      <FilterGroup<Attribute>
        // title={props.smartList.title} TODO: add title
        filters={attributes.map((attr) => ({
          label: attr.value.toLowerCase(),
          data: attr,
          prefixDot: attr.color,
          filterIcon: ({ selected }) => <FilterGroupColorDot color={attr.color} selected={selected} />,
          editComponent: (
            <UpdateAttributeModal attribute={attr} onSave={updateAttribute} onDelete={(attribute) => deleteAttribute(attribute.id)} />
          ),
          tooltipText: attr.description,
        }))}
        onSelected={setSelectedAttribute}
        selected={selectedAttributes}
        isAdmin={isAdmin}
        spacing='xl'
      />
    </div>
  );
}
