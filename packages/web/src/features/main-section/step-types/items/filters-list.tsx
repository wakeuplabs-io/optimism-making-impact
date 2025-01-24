import { FilterGroup } from '@/components/filter-group';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { AddAttributeModal } from '@/features/main-section/step-types/items/add-attribute-modal';
import { UpdateAttributeModal } from '@/features/main-section/step-types/items/update-attribute-modal';
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
      <div className='flex items-center justify-between w-full gap-4 h-14 lg:static'>
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
  const isAdmin = useUserStore((state) => state.isAdmin);

  if (!props.smartList) {
    return (
      <div className='flex justify-center w-full'>
        <span>There is no Smart List for this step</span>
      </div>
    );
  }

  return <SmartListFilter smartList={props.smartList} stepId={props.stepId} isAdmin={isAdmin} />;
}

interface SmartListFilterProps {
  stepId: number;
  smartList: CompleteSmartList;
  isAdmin?: boolean;
}

function SmartListFilter(props: SmartListFilterProps) {
  const addAttributeToSmartList = useMainSectionStore((state) => state.addAttributeToSmartList);
  const updateAttribute = useMainSectionStore((state) => state.updateAttribute);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center justify-between h-12'>
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
            editComponent: <UpdateAttributeModal attribute={attr} onClick={updateAttribute} />,
          }))}
          isAdmin={props.isAdmin}
        />
      </div>
    </div>
  );
}
