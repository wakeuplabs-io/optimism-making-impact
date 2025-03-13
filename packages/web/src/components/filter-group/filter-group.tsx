import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { ComponentProps, useMemo } from 'react';
import { useToggle } from 'usehooks-ts';

type FilterIcon = React.ComponentType<{ selected: boolean }>;
interface FilterData {
  id: number;
}
interface Filter<T extends FilterData> {
  data: T;
  label: string;
  filterIcon?: FilterIcon;
  editComponent?: React.ReactNode;
  deleteComponent?: React.ReactNode;
  tooltipText?: string;
}

interface FilterGroupProps<T extends FilterData> {
  title?: string;
  filters: Filter<T>[];
  className?: string;
  isAdmin?: boolean;
  spacing?: 'md' | 'lg' | 'xl';
  selected?: T[];
  maxFilters?: number;
  onSelected: (data: T) => void;
}

export function FilterGroup<T extends FilterData>(props: FilterGroupProps<T>) {
  const [showAllFilters, toggleShowAllFilters] = useToggle(false);

  const editionIsAllowed = !!props.selected?.length;
  const showAllFiltersEnabled = props.maxFilters && props.maxFilters > 0 && props.maxFilters < props.filters.length;

  const selectedFilters = useMemo(() => {
    return props.filters.reduce(
      (acc, filter) => {
        if (!props.selected || props.selected.length === 0) {
          acc[filter.data.id] = true;
        } else {
          acc[filter.data.id] = props.selected.some((selected) => selected.id === filter.data.id);
        }
        return acc;
      },
      {} as Record<number, boolean>,
    );
  }, [props.filters, props.selected]);

  const [filtersToDisplay, hiddenFilterAmount] = useMemo(() => {
    if (showAllFilters || !showAllFiltersEnabled || !props.maxFilters) return [props.filters, 0];

    return [props.filters.slice(0, props.maxFilters), props.filters.length - props.maxFilters];
  }, [props.filters, props.maxFilters, showAllFilters, showAllFiltersEnabled]);

  return (
    <div className={cn('flex flex-col gap-4', props.className)}>
      {props.title && <h3 className='text-sm font-semibold text-gray-700'>{props.title}</h3>}
      <div
        className={cn('flex flex-col gap-1', {
          'gap-2': !props.spacing || props.spacing === 'md',
          'gap-4': props.spacing === 'lg',
          'gap-8': props.spacing === 'xl',
        })}
      >
        {props.filters.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {filtersToDisplay.map((filter, i) => (
              <FilterButton
                key={`${filter.label}-${i}`}
                label={filter.label}
                data={filter.data}
                editable={selectedFilters[filter.data.id] && editionIsAllowed}
                selected={!!selectedFilters[filter.data.id]}
                onClick={props.onSelected}
                filterIcon={filter.filterIcon}
                isAdmin={props.isAdmin}
                editComponent={filter.editComponent}
                tooltipText={filter.tooltipText}
                deleteComponent={filter.deleteComponent}
              />
            ))}
            {showAllFiltersEnabled && (
              <button className='pl-6 text-sm text-left underline' onClick={() => toggleShowAllFilters()}>
                {showAllFilters ? 'Collapse' : `View all (${hiddenFilterAmount})`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='text-sm text-center'>
      <span>No filters available</span>
    </div>
  );
}

interface FilterButtonProps<T extends FilterData> extends Omit<ComponentProps<'button'>, 'onClick'> {
  label: string;
  editable: boolean;
  selected: boolean;
  data: T;
  onClick?: (data: T) => void;
  filterIcon?: FilterIcon;
  isAdmin?: boolean;
  editComponent?: React.ReactNode;
  deleteComponent?: React.ReactNode;
  tooltipText?: string;
}

function FilterButton<T extends FilterData>({
  label,
  selected,
  className,
  data,
  onClick,
  filterIcon: FilterIcon,
  editable = false,
  deleteComponent,
  editComponent,
  tooltipText,
  isAdmin,
  ...props
}: FilterButtonProps<T>) {
  function handleClick() {
    if (onClick) {
      onClick(data);
    }
  }

  return (
    <button
      {...props}
      className={cn(
        'border-1 flex w-fit max-w-full items-center justify-start gap-2 rounded-full border border-transparent py-0.5',
        {
          'text-[#D9D9D9]': !selected,
        },
        className,
      )}
      onClick={handleClick}
    >
      {FilterIcon && (
        // All icons have the same size, so we can use a fixed size for the container.
        <div className='flex items-center justify-center w-4 h-4'>
          <FilterIcon selected={selected} />
        </div>
      )}
      <span className='overflow-hidden text-sm font-normal text-left capitalize w-fit max-w-44 text-ellipsis text-nowrap hover:underline'>
        {label}
      </span>
      {tooltipText && <InfoIcon tooltipText={tooltipText} />}
      {isAdmin && editable && (
        <div className='flex items-center gap-1' onClick={(e) => e.stopPropagation()}>
          {editComponent}
          {deleteComponent}
        </div>
      )}
    </button>
  );
}

function InfoIcon(props: { tooltipText: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Info size={14} className='stroke-[#A8A8A8] hover:stroke-black' />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
