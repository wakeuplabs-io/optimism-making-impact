import { ColorDot } from '@/components/color-dot';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Color } from '@/types';
import { Info } from 'lucide-react';
import { ComponentProps } from 'react';

interface Filter<T> {
  data: T;
  label: string;
  selected: boolean;
  onClick?: (data: T) => void;
  prefixDot?: Color | undefined;
  editComponent?: React.ReactNode;
  deleteComponent?: React.ReactNode;
  tooltipText?: string;
}

interface FilterGroupProps<T> {
  title?: string;
  filters: Filter<T>[];
  className?: string;
  isAdmin?: boolean;
  spacing?: 'md' | 'lg' | 'xl';
}

export function FilterGroup<T>(props: FilterGroupProps<T>) {
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
              selected={filter.selected}
              onClick={filter.onClick}
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

interface FilterButtonProps<T> extends Omit<ComponentProps<'button'>, 'onClick'> {
  label: string; // Label displayed on the button.
  selected?: boolean; // Whether the button is in a "selected" state.
  data: T; // Data payload associated with this button.
  onClick?: (data: T) => void; // Callback when the button is clicked.
  prefixDot?: Color | undefined;
  isAdmin?: boolean;
  editComponent?: React.ReactNode;
  deleteComponent?: React.ReactNode;
  tooltipText?: string;
}

function FilterButton<T>({ label, selected, className, data, onClick, prefixDot, ...props }: FilterButtonProps<T>) {
  function handleClick() {
    if (onClick) {
      onClick(data);
    }
  }

  return (
    <button
      {...props}
      className={cn(
        'flex w-fit max-w-full items-center justify-start gap-2 rounded-full px-2 py-0.5',
        selected && 'border-1 border border-black',
        className,
      )}
      onClick={handleClick}
    >
      {prefixDot && <ColorDot color={prefixDot} />}
      <span
        className={cn(
          'w-fit max-w-44 overflow-hidden text-ellipsis text-nowrap text-left text-[14px] font-[400] capitalize hover:underline',
          selected && 'font-bold',
        )}
      >
        {label}
      </span>
      {props.tooltipText && <InfoIcon tooltipText={props.tooltipText} />}
      {props.isAdmin && (
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
