import { FilterGroup } from '@/components/filter-group';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { AddAttributeModal } from '@/features/main-section/step-types/items/add-attribute-modal';
import { CreateSmartListModal } from '@/features/main-section/step-types/items/create-smart-list-modal';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useUserStore } from '@/state';
import { useCardFiltersStore } from '@/state/main-section-filters/store';
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
  const { selectedKeywords, selectedStrengths } = useCardFiltersStore((state) => state);

  const menuText = useMemo(() => {
    if (!isMobile) return;
    const numberOfFilters = selectedKeywords.length + selectedStrengths.length;
    if (numberOfFilters === 0) return 'All';
    if (numberOfFilters === 1) return `${numberOfFilters} Filter`;
    return `${numberOfFilters} Filters`;
  }, [selectedKeywords, selectedStrengths, isMobile]);

  if (isMobile) {
    return (
      <div className='flex h-14 w-full items-center justify-between gap-4 lg:static'>
        <span>{menuText}</span>
        <SideMenu trigger={<FiltersIcon size={24} />} description='Filters' side='right' className='w-[250px]'>
          {props.children}
        </SideMenu>
      </div>
    );
  }

  return <div className='flex w-[250px] min-w-[250px] p-2'>{props.children}</div>;
}

interface ContentProps {
  stepId: number;
  smartList?: CompleteSmartList;
}

function Content(props: ContentProps) {
  const { createSmartList } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);

  if (!props.smartList) {
    if (!isAdmin) return null;
    return (
      <div className='flex w-full justify-center'>
        {/* TODO: DELETE: when i create a step of type items it should already have a smart list (selected or associated) */}
        <CreateSmartListModal stepId={props.stepId} onClick={createSmartList} />
      </div>
    );
  }

  return <SmartListFilter smartList={props.smartList} stepId={props.stepId} />;
}

interface SmartListFilterProps {
  stepId: number;
  smartList: CompleteSmartList;
}

function SmartListFilter(props: SmartListFilterProps) {
  const addAttributeToSmartList = useMainSectionStore((state) => state.addAttributeToSmartList);
  return (
    <div className='flex w-full flex-col'>
      <div className='flex h-12 items-center justify-between'>
        <h2 className='text-[20px] font-[500]'>Filters</h2>
        <AddAttributeModal smartListId={props.smartList.id} onClick={addAttributeToSmartList} />
      </div>
      <hr className='border-[#D9D9D9]' />

      <div className='flex flex-col gap-8'>
        <FilterGroup<Attribute>
          className='mt-4'
          filters={props.smartList.attributes.map((attr) => ({
            label: attr.value.toLowerCase(),
            selected: false,
            onClick: (a) => console.log('🎈 ', a),
            data: attr,
            prefixDot: attr.color,
          }))}
        />
      </div>
    </div>
  );
}
