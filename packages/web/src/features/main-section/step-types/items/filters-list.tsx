import { FilterGroup } from '@/components/filter-group/filter-group';
import { FilterGroupColorDot } from '@/components/filter-group/filter-group-icon';
import { FiltersIcon } from '@/components/icons/filters';
import { SideMenu } from '@/components/side-menu';
import { AddAttributeModal } from '@/features/main-section/step-types/items/add-attribute-modal';
import { useItemsStepContext } from '@/features/main-section/step-types/items/context/use-items-step-context';
import { UpdateAttributeModal } from '@/features/main-section/step-types/items/update-attribute-modal';
import { useStep } from '@/hooks/use-step';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUser } from '@/hooks/use-user';
import { Attribute } from '@optimism-making-impact/schemas';

export function ItemFilters() {
  return (
    <Container>
      <Content />
    </Container>
  );
}

function Container(props: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='flex h-14 w-full items-center justify-end gap-4 px-4 lg:static'>
        <SideMenu trigger={<FiltersIcon size={24} />} description='Filters' side='right' className='w-[300px]'>
          {props.children}
        </SideMenu>
      </div>
    );
  }

  return <div className='flex h-fit min-w-[250px] rounded-[22px] bg-white px-8 py-6'>{props.children}</div>;
}

function Content() {
  const { attributes, setSelectedAttributes, selectedAttributes, step } = useItemsStepContext();
  const { isAdminModeEnabled: isAdmin } = useUser();
  const { addAttributeToSmartList, updateAttribute, deleteAttribute } = useStep();

  if (!step.smartListFilter) {
    return (
      <div className='flex w-full justify-center'>
        <span>There is no Smart List Filter for this step</span>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='flex w-full items-center justify-between gap-2'>
        <span className='text-base font-semibold'>Filters</span>
        {isAdmin && <AddAttributeModal smartListFilterId={step.smartListFilter.id} onClick={addAttributeToSmartList} />}
      </div>
      <hr className='my-6 border-[#D9D9D9]' />
      <FilterGroup<Attribute>
        filters={attributes.map((attr) => ({
          label: attr.value.toLowerCase(),
          data: attr,
          prefixDot: attr.color,
          filterIcon: ({ selected }) => <FilterGroupColorDot color={attr.color} selected={selected} />,
          editComponent: (
            <UpdateAttributeModal attribute={attr} onSave={updateAttribute} onDelete={(attribute) => deleteAttribute(attribute.id)} />
          ),
          tooltipText: attr.description,
        }))}
        onSelected={setSelectedAttributes}
        selected={selectedAttributes}
        isAdmin={isAdmin}
        spacing='xl'
        withLabelTooltip
      />
    </div>
  );
}
