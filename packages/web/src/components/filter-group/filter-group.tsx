import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-tresholds';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'usehooks-ts';
import { Modal } from '../modal';

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
  withLabelTooltip?: boolean;
}

export function FilterGroup<T extends FilterData>(props: FilterGroupProps<T>) {
  const [showAllFilters, toggleShowAllFilters] = useToggle(false);
  const editionIsAllowed = !!props.selected?.length;
  const showAllFiltersEnabled = props.maxFilters && props.maxFilters > 0 && props.maxFilters < props.filters.length;

  const selectedFilters = useMemo(() => {
    return props.filters.reduce(
      (acc, filter) => {
        acc[filter.data.id] =
          !props.selected || props.selected.length === 0 ? true : props.selected.some((selected) => selected.id === filter.data.id);
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
                withLabelTooltip={props.withLabelTooltip}
              />
            ))}
            {showAllFiltersEnabled && (
              <button className='pl-6 text-sm underline' onClick={() => toggleShowAllFilters()}>
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
    <div className='text-center text-sm'>
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
  withLabelTooltip?: boolean;
}

function FilterButton<T extends FilterData>({
  label,
  selected,
  className,
  data,
  onClick,
  filterIcon,
  editable = false,
  deleteComponent,
  editComponent,
  tooltipText,
  isAdmin,
  ...props
}: FilterButtonProps<T>) {
  function handleClick() {
    if (onClick) onClick(data);
  }

  return (
    <button
      {...props}
      className={cn('flex w-full items-center gap-2 rounded-full py-0.5', !selected && 'text-[#D9D9D9]', className)}
      onClick={handleClick}
    >
      {filterIcon && <FilterButtonIcon filterIcon={filterIcon} selected={selected} />}
      <FilterButtonLabel label={label} withLabelTooltip={props.withLabelTooltip} />
      <FilterButtonActions
        tooltipText={tooltipText}
        isAdmin={isAdmin}
        editable={editable}
        editComponent={editComponent}
        deleteComponent={deleteComponent}
      />
    </button>
  );
}

interface FilterButtonIconProps {
  filterIcon: FilterIcon;
  selected: boolean;
}

function FilterButtonIcon({ filterIcon: FilterIcon, selected }: FilterButtonIconProps) {
  return (
    <div className='flex h-full w-4 items-center'>
      <FilterIcon selected={selected} />
    </div>
  );
}

interface FilterButtonLabelProps {
  label: string;
  withLabelTooltip?: boolean;
}

function FilterButtonLabel(props: FilterButtonLabelProps) {
  if (!props.withLabelTooltip) {
    return <span className='overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize hover:underline'>{props.label}</span>;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className='overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize hover:underline'>{props.label}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p className='capitalize'>{props.label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface FilterButtonActionsProps {
  tooltipText?: string;
  isAdmin?: boolean;
  editable: boolean;
  editComponent?: React.ReactNode;
  deleteComponent?: React.ReactNode;
}

function FilterButtonActions(props: FilterButtonActionsProps) {

  return (
    <div className='ml-auto flex items-center gap-1' onClick={(e) => e.stopPropagation()}>
      {props.tooltipText && <InfoIcon tooltipText={props.tooltipText} />}
      {props.isAdmin && props.editable && (
        <>
          {props.editComponent}
          {props.deleteComponent}
        </>
      )}
    </div>
  );
}

interface InfoIconProps {
  tooltipText: string;
}

function InfoIcon(props: InfoIconProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node))
        setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Info size={14} className='stroke-[#A8A8A8] hover:stroke-black' onClick={() => isMobile && setIsOpen(true)} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.tooltipText}</p>
        </TooltipContent>
      </Tooltip>
      <Modal open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <p>{props.tooltipText}</p>
      </Modal>
    </>
  );
}
