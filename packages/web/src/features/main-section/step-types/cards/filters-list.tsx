import { FilterGroup } from '@/components/filter-group';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useFiltersStore } from '@/state/main-section-filters/store';
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
      <div className='flex items-center justify-between w-full gap-4 px-4 lg:static'>
        <span>{menuText}</span>
        <SideMenu trigger={<FiltersIcon size={24} />} description='Filters' side='right' className='w-[250px]'>
          {props.children}
        </SideMenu>
      </div>
    );
  }

  return <div className='flex h-fit w-[250px] min-w-[250px] rounded-[22px] bg-white px-8 py-6'>{props.children}</div>;
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
  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-base font-semibold'>Filters</h2>
      <hr className='my-4' />
      <div className='flex flex-col gap-8'>
        {props.smartList && (
          <FilterGroup
            title={props.smartList.title}
            filters={props.smartList.attributes.map((attr) => ({
              label: attr.value.toLowerCase(),
              data: attr,
              filterIcon: {
                type: 'DOT',
                color: attr.color,
              },
              tooltipText: attr.description,
            }))}
            onSelected={setSelectedAttributes}
            selected={selectedAttributes}
          />
        )}
        <FilterGroup
          title='Strength'
          filters={strengths.map((strength) => ({
            label: strength.value.toLowerCase(),
            data: strength,
          }))}
          onSelected={setSelectedStrengths}
          selected={selectedStrengths}
        />
        <FilterGroup
          title='Keywords'
          filters={keywords.map((keyword) => ({
            label: keyword.value.toLowerCase(),
            data: keyword,
          }))}
          onSelected={setSelectedKeywords}
          selected={selectedKeywords}
        />
      </div>
    </div>
  );
}
