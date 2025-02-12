import { FilterGroup } from '@/components/filter-group';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { DeleteKeywordButton } from '@/features/main-section/step-types/cards/delete-keyword-button';
import { useIsMobile } from '@/hooks/use-tresholds';
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
      <div className='flex items-center justify-between w-full gap-4 h-14 lg:static'>
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
  const { deleteKeyword } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-[20px] font-[500]'>Filters</h2>
      <hr className='border-[#D9D9D9] my-6' />
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
          filters={strengths.map((strength) => ({
            label: strength.value.toLowerCase(),
            selected: selectedStrengths.includes(strength),
            onClick: setSelectedStrengths,
            data: strength,
          }))}
        />
        <FilterGroup
          title='Keywords'
          filters={keywords.map((keyword) => {
            const selected = selectedKeywords.map(({ id }) => id).includes(keyword.id);
            return {
              label: keyword.value.toLowerCase(),
              selected,
              onClick: setSelectedKeywords,
              data: keyword,
              deleteComponent: (
                <DeleteKeywordButton
                  keyword={keyword}
                  onClick={(keywordId) => {
                    deleteKeyword(keywordId);
                    if (selected) setSelectedKeywords(keyword);
                  }}
                />
              ),
            };
          })}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
}
