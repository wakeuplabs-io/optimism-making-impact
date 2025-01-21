import { FilterGroup } from '@/features/main-section/step-types/cards/filter-group';
import { useCardFiltersStore } from '@/state/main-section-filters/store';

export function CardFilters() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  return <div className='flex w-[250px] min-w-[250px] p-2'>{props.children}</div>;
}

function Content() {
  const { strengths, selectedStrengths, setSelectedStrengths, keywords, selectedKeywords, setSelectedKeywords } = useCardFiltersStore(
    (state) => state,
  );

  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-[24px] font-[500]'>Filters</h2>
      <hr className='my-5 border-[#D9D9D9]' />

      <div className='flex flex-col gap-8'>
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
