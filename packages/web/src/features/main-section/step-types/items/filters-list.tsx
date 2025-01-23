import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
// TODO: move to a common place
// import { FilterGroup } from '@/features/main-section/step-types/cards/filter-group';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useCardFiltersStore } from '@/state/main-section-filters/store';
import { useMemo } from 'react';

export function ItemFilters() {
  return (
    <Container>
      <Content />
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

function Content() {
  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-[24px] font-[500]'>Filters</h2>
      <hr className='my-5 border-[#D9D9D9]' />

      <div className='flex flex-col gap-8'>
        {/* <FilterGroup
          title='Keywords'
          filters={keywords.map((keyword) => ({
            label: keyword.value.toLowerCase(),
            selected: selectedKeywords.map(({ id }) => id).includes(keyword.id),
            onClick: setSelectedKeywords,
            data: keyword,
          }))}
        /> */}
      </div>
    </div>
  );
}
