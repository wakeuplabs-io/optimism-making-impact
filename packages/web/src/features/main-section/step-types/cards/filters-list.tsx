import { FilterStrengthIcon } from './filter-strength-icon';
import { FilterGroup } from '@/components/filter-group/filter-group';
import { FilterGroupColorDot, FilterGroupIcon } from '@/components/filter-group/filter-group-icon';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { useAttributesFilter } from '@/features/filters/attributes/use-attributes-filter';
import { useKeywordsFilter } from '@/features/filters/keywords/use-keywords-filter';
import { useStrengthsFilter } from '@/features/filters/strengths/use-strengths-filter';
import { useIsMobile } from '@/hooks/use-tresholds';
import { getRandomBadgeColor } from '@/lib/utils';
import { CompleteSmartListFilter } from '@/types/smart-list-filters';
import { Hash } from 'lucide-react';
import { useMemo } from 'react';

interface CardFiltersProps {
  smartListFilter?: CompleteSmartListFilter | null;
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
  const { selectedKeywords } = useKeywordsFilter();
  const { selectedStrengths } = useStrengthsFilter();

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

  return <div className='flex h-fit w-[250px] min-w-[250px] rounded-[22px] bg-white px-8 py-6'>{props.children}</div>;
}

interface ContentProps {
  smartListFilter?: CompleteSmartListFilter | null;
  stepId: number;
}

function Content(props: ContentProps) {
  const { selectedKeywords, keywords, setSelectedKeywords } = useKeywordsFilter();
  const { selectedStrengths, strengths, setSelectedStrengths } = useStrengthsFilter();
  const { selectedAttributes, setSelectedAttributes } = useAttributesFilter();

  return (
    <div className='flex w-full flex-col'>
      <h2 className='text-base font-semibold'>Filters</h2>
      <hr className='my-4' />
      <div className='flex flex-col gap-8'>
        {props.smartListFilter && (
          <FilterGroup
            className='mt-4'
            title={props.smartListFilter.title}
            filters={props.smartListFilter.attributes.map((attr) => ({
              label: attr.value.toLowerCase(),
              data: attr,
              filterIcon: ({ selected }) => <FilterGroupColorDot selected={selected} color={attr.color} />,
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
            filterIcon: ({ selected }) => <FilterStrengthIcon strength={strength.value} selected={selected} />,
          }))}
          onSelected={setSelectedStrengths}
          selected={selectedStrengths}
        />
        <FilterGroup
          title='Keywords'
          filters={keywords.map((keyword) => ({
            label: keyword.value.toLowerCase(),
            data: keyword,
            filterIcon: ({ selected }) => (
              <FilterGroupIcon
                selected={selected}
                icon={Hash}
                color={getRandomBadgeColor(keyword.value.toLowerCase()).color}
                strokeWidth={3}
              />
            ),
          }))}
          onSelected={setSelectedKeywords}
          selected={selectedKeywords}
          maxFilters={3}
        />
      </div>
    </div>
  );
}
