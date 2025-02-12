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
import { Attribute } from '@/types';
import { CompleteSmartList } from '@/types/smart-lists';
import { useMemo } from 'react';

interface ItemsFiltersProps {
  stepId: number;
  smartList?: CompleteSmartList;
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
      <div className='flex h-14 w-full items-center justify-between gap-4 lg:static'>
        <span>{menuText}</span>
        <SideMenu trigger={<FiltersIcon size={24} />} description='Filters' side='right' className='w-[300px]'>
          {props.children}
        </SideMenu>
      </div>
    );
  }

  return <div className='flex h-fit w-[250px] min-w-[250px] rounded-[22px] bg-white p-5'>{props.children}</div>;
}

interface ContentProps {
  stepId: number;
  smartList?: CompleteSmartList;
}

function Content(props: ContentProps) {
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const addAttributeToSmartList = useMainSectionStore((state) => state.addAttributeToSmartList);
  const updateAttribute = useMainSectionStore((state) => state.updateAttribute);
  const deleteAttribute = useMainSectionStore((state) => state.deleteAttribute);
  const { selectedAttributes, setSelectedAttributes } = useFiltersStore((state) => state);

  if (!props.smartList) {
    return (
      <div className='flex w-full justify-center'>
        <span>There is no Smart List for this step</span>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='flex items-center justify-between'>
        <h2 className='text-[20px] font-[500]'>Filters</h2>
        {isAdmin && <AddAttributeModal smartListId={props.smartList.id} onClick={addAttributeToSmartList} />}
      </div>
      <hr className='my-6 border-[#D9D9D9]' />
      <FilterGroup<Attribute>
        // title={props.smartList.title} TODO: add title
        filters={props.smartList.attributes.map((attr) => ({
          label: attr.value.toLowerCase(),
          selected: selectedAttributes.map(({ id }) => id).includes(attr.id),
          onClick: setSelectedAttributes,
          data: attr,
          prefixDot: attr.color,
          editComponent: <UpdateAttributeModal attribute={attr} onClick={updateAttribute} />,
          deleteComponent: <DeleteAttributeModal attributeId={attr.id} onClick={deleteAttribute} />,
          tooltipText: attr.description,
        }))}
        isAdmin={isAdmin}
        spacing='xl'
      />
    </div>
  );
}
