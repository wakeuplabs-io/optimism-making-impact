import { FilterGroup } from '@/components/filter-group';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useFiltersStore } from '@/state/main-section-filters/store';
import { CompleteSmartListFilter } from '@/types/smart-lists';
import { useMemo } from 'react';

interface CardFiltersProps {
  smartListFilter?: CompleteSmartListFilter;
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
      <div className='flex w-full items-center justify-between gap-4 px-4 lg:static'>
        <span>{menuText}</span>
        <SideMenu trigger={<FiltersIcon size={24} />} description='Filters' side='right' className='w-[250px]'>
          {props.children}
        </SideMenu>
      </div>
    );
  }

  return <div className='flex h-fit w-[250px] min-w-[250px] rounded-[22px] bg-white p-5'>{props.children}</div>;
}

interface ContentProps {
  smartListFilter?: CompleteSmartListFilter;
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
    <div className='flex w-full flex-col'>
      <h2 className='text-[20px] font-[500]'>Filters</h2>
      <hr className='my-6 border-[#D9D9D9]' />
      <div className='flex flex-col gap-8'>
        {props.smartListFilter && (
          <FilterGroup
            className='mt-4'
            title={props.smartListFilter.title}
            filters={props.smartListFilter.attributes.map((attr) => ({
              label: attr.value.toLowerCase(),
              data: attr,
              prefixDot: attr.color,
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
