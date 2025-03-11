import { FilterGroup } from '@/components/filter-group';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { AddAttributeModal } from '@/features/main-section/step-types/items/add-attribute-modal';
import { DeleteAttributeModal } from '@/features/main-section/step-types/items/delete-attribute-modal';
import { UpdateAttributeModal } from '@/features/main-section/step-types/items/update-attribute-modal';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteSmartListFilter } from '@/types/smart-lists';
import { Attribute } from '@optimism-making-impact/schemas';
import { useMemo } from 'react';

interface ItemsFiltersProps {
  stepId: number;
  smartListFilter?: CompleteSmartListFilter;
}

export function ItemFilters(props: ItemsFiltersProps) {
  return (
    <Container>
      <Content {...props} />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { selectedKeywords, selectedStrengths, selectedAttributes } = useFiltersStore((state) => state);

  const menuText = useMemo(() => {
    if (!isMobile) return;
    const numberOfFilters = selectedKeywords.length + selectedStrengths.length + selectedAttributes.length;
    if (numberOfFilters === 0) return 'All';
    if (numberOfFilters === 1) return `${numberOfFilters} Filter`;
    return `${numberOfFilters} Filters`;
  }, [selectedKeywords, selectedStrengths, isMobile]);

  if (isMobile) {
    return (
      <div className='flex h-14 w-full items-center justify-between gap-4 px-4 lg:static'>
        <span>{menuText}</span>
        <SideMenu trigger={<FiltersIcon size={24} />} description='Filters' side='right' className='w-[300px]'>
          {props.children}
        </SideMenu>
      </div>
    );
  }

  return <div className='flex h-fit max-w-[250px] rounded-[22px] bg-white px-8 py-6'>{props.children}</div>;
}

interface ContentProps {
  stepId: number;
  smartListFilter?: CompleteSmartListFilter;
}

function Content(props: ContentProps) {
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const addAttributeToSmartList = useMainSectionStore((state) => state.addAttributeToSmartList);
  const updateAttribute = useMainSectionStore((state) => state.updateAttribute);
  const deleteAttribute = useMainSectionStore((state) => state.deleteAttribute);
  const { selectedAttributes, setSelectedAttributes } = useFiltersStore((state) => state);

  if (!props.smartListFilter) {
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
        {isAdmin && <AddAttributeModal smartListFilterId={props.smartListFilter.id} onClick={addAttributeToSmartList} />}
      </div>
      <hr className='my-6 border-[#D9D9D9]' />
      <FilterGroup<Attribute>
        // title={props.smartList.title} TODO: add title
        filters={props.smartListFilter.attributes.map((attr) => ({
          label: attr.value.toLowerCase(),
          data: attr,
          prefixDot: attr.color,
          editComponent: <UpdateAttributeModal attribute={attr} onClick={updateAttribute} />,
          deleteComponent: <DeleteAttributeModal attributeId={attr.id} onClick={deleteAttribute} />,
          tooltipText: attr.description,
        }))}
        onSelected={setSelectedAttributes}
        selected={selectedAttributes}
        isAdmin={isAdmin}
        spacing='xl'
      />
    </div>
  );
}
