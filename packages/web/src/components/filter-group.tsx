import { ColorDot } from '@/components/color-dot';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Color } from '@optimism-making-impact/schemas';
import { Info } from 'lucide-react';
import { ComponentProps, useMemo } from 'react';

interface FilterData {
  id: number;
}

interface Filter<T extends FilterData> {
  data: T;
  label: string;
  prefixDot?: Color | undefined;
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
  onSelected: (data: T) => void;
}

export function FilterGroup<T extends FilterData>(props: FilterGroupProps<T>) {
  //only when a selected filter is present, the edition is allowed
  const editionIsAllowed = !!props.selected?.length;

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

  return (
    <div className={cn('flex flex-col gap-2', props.className)}>
      {props.title && <h3 className='text-[16px] font-[400] text-[#68778D]'>{props.title}</h3>}
      <div
        className={cn('flex flex-col gap-1', {
          'gap-1': !props.spacing || props.spacing === 'md',
          'gap-4': props.spacing === 'lg',
          'gap-8': props.spacing === 'xl',
        })}
      >
        {props.filters.length === 0 ? (
          <EmptyState />
        ) : (
          props.filters.map((filter, i) => (
            <FilterButton
              key={`${filter.label}-${i}`}
              label={filter.label}
              data={filter.data}
              editable={selectedFilters[filter.data.id] && editionIsAllowed}
              selected={selectedFilters[filter.data.id]}
              onClick={props.onSelected}
              prefixDot={filter.prefixDot}
              isAdmin={props.isAdmin}
              editComponent={filter.editComponent}
              tooltipText={filter.tooltipText}
              deleteComponent={filter.deleteComponent}
            />
          ))
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
  label: string; // Label displayed on the button.
  editable: boolean;
  selected?: boolean; // Whether the button is in a "selected" state.
  data: T; // Data payload associated with this button.
  onClick?: (data: T) => void; // Callback when the button is clicked.
  prefixDot?: Color | undefined;
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
  prefixDot,
  editable = false,
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
        'flex w-fit max-w-full items-center justify-start gap-2 rounded-full px-2 py-0.5 border-1 border border-transparent',
        {
          'text-[#D9D9D9]': !selected,
        },
        className,
      )}
      onClick={handleClick}
    >
      {prefixDot && <ColorDot color={selected ? prefixDot : 'GRAY'} />}
      <span className='w-fit max-w-44 overflow-hidden text-ellipsis text-nowrap text-left text-[14px] font-[400] capitalize hover:underline'>
        {label}
      </span>
      {props.tooltipText && <InfoIcon tooltipText={props.tooltipText} />}
      {props.isAdmin && editable && (
        <div className='flex items-center gap-1' onClick={(e) => e.stopPropagation()}>
          {props.editComponent}
          {props.deleteComponent}
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
