import { FilterGroup } from '@/components/filter-group';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { AddCardModal } from '@/features/main-section/step-types/cards/add-card-button';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useUserStore } from '@/state';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteSmartList } from '@/types/smart-lists';
import { useMemo } from 'react';

interface CardFiltersProps {
  smartList?: CompleteSmartList;
  stepId: number;
}

export function CardFilters(props: CardFiltersProps) {
  return (
    <Container>
      <Content {...props} />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { selectedKeywords, selectedStrengths } = useFiltersStore((state) => state);

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
  smartList?: CompleteSmartList;
  stepId: number;
}

function Content(props: ContentProps) {
  const {
    strengths,
    selectedStrengths,
    setSelectedStrengths,
    keywords,
    selectedKeywords,
    setSelectedKeywords,
    selectedAttributes,
    setSelectedAttributes,
  } = useFiltersStore((state) => state);
  const addCard = useMainSectionStore((state) => state.addCard);
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <div className='flex w-full flex-col'>
      {isAdmin && (
        <div className='mb-8'>
          <AddCardModal stepId={props.stepId} onClick={addCard} keywords={keywords} attributes={props.smartList?.attributes} />
        </div>
      )}

      <h2 className='h-12 text-[20px] font-[500]'>Filters</h2>
      <hr className='border-[#D9D9D9]' />

      <div className='flex flex-col gap-8'>
        {props.smartList && (
          <FilterGroup
            className='mt-4'
            title={props.smartList.title}
            filters={props.smartList.attributes.map((attr) => ({
              label: attr.value.toLowerCase(),
              selected: selectedAttributes.map(({ id }) => id).includes(attr.id),
              onClick: setSelectedAttributes,
              data: attr,
              prefixDot: attr.color,
              tooltipText: attr.description,
            }))}
          />
        )}
        <FilterGroup
          title='Strength'
          filters={strengths.map((value) => ({
            label: value.toLowerCase(),
            selected: selectedStrengths.includes(value),
            onClick: setSelectedStrengths,
            data: value,
          }))}
        />
        <FilterGroup
          title='Keywords'
          filters={keywords.map((keyword) => ({
            label: keyword.value.toLowerCase(),
            selected: selectedKeywords.map(({ id }) => id).includes(keyword.id),
            onClick: setSelectedKeywords,
            data: keyword,
          }))}
        />
      </div>
    </div>
  );
}
