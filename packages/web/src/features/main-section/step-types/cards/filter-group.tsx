import { cn } from '@/lib/utils';
import { Color } from '@/types';
import { X } from 'lucide-react';
import { ComponentProps } from 'react';

interface Filter<T> {
  data: T;
  label: string;
  selected: boolean;
  onClick?: (data: T) => void;
  prefixDot?: Color | undefined;
}

interface FilterGroupProps<T> {
  title?: string;
  filters: Filter<T>[];
  className?: string;
}

export function FilterGroup<T>(props: FilterGroupProps<T>) {
  return (
    <div className={cn('flex flex-col gap-2', props.className)}>
      {props.title && <h3 className='text-[16px] font-[400] text-[#68778D]'>{props.title}</h3>}
      <div className='flex flex-col gap-1'>
        {props.filters.map((filter, i) => (
          <FilterButton
            key={`${filter.label}-${i}`}
            label={filter.label}
            data={filter.data}
            selected={filter.selected}
            onClick={filter.onClick}
            prefixDot={filter.prefixDot}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterButtonProps<T> extends Omit<ComponentProps<'button'>, 'onClick'> {
  label: string; // Label displayed on the button.
  selected?: boolean; // Whether the button is in a "selected" state.
  data: T; // Data payload associated with this button.
  onClick?: (data: T) => void; // Callback when the button is clicked.
  prefixDot?: Color | undefined;
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
        'flex w-fit items-center justify-between gap-4 rounded-full px-2 py-0.5',
        selected && 'border-1 border border-black',
        className,
      )}
      onClick={handleClick}
    >
      {prefixDot && <div className='h-2 w-2 rounded-full' style={{ backgroundColor: prefixDot }} />}
      <span className={cn('text-[14px] font-[400] capitalize hover:underline', selected && 'font-bold')}>{label}</span>
      {selected && <X size={12} className='stroke-[#4E4E4E] hover:stroke-black' />}
    </button>
  );
}
