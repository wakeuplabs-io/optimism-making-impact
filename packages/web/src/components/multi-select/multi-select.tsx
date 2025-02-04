import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, X, XIcon } from 'lucide-react';
import * as React from 'react';

interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: {
    label: string;
    value: string;
  }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  containerClassName?: string;
  selectAllEnabled?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  ({ options, onValueChange, defaultValue = [], placeholder = 'Select options', maxCount = 3, asChild = false, className, ...props }) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const selectRef = React.useRef<HTMLButtonElement>(null);
    const [popoverWidth, setPopoverWidth] = React.useState(200);
    const [modalPopover, setModalPopover] = React.useState(true);

    const triggerWidth = selectRef?.current?.getBoundingClientRect().width;

    React.useEffect(() => {
      if (triggerWidth) {
        setPopoverWidth(triggerWidth);
      }
    }, [triggerWidth]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    function handlePopoverOpenChange(open: boolean) {
      if (props.disabled) return;
      setIsPopoverOpen(open);
      setModalPopover(open);
    }

    return (
      <div className={cn('flex w-full flex-col gap-1.5', props.containerClassName)}>
        <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange} modal={modalPopover}>
          <PopoverTrigger asChild={asChild}>
            <Button
              type='button'
              ref={selectRef}
              onClick={handleTogglePopover}
              {...props}
              className={cn(
                'flex h-auto min-h-9 w-full items-center justify-between rounded-md border border-input bg-inherit p-1 shadow-none [&_svg]:pointer-events-auto',
                className,
              )}
            >
              {selectedValues.length > 0 ? (
                <div className='flex items-center justify-between w-full px-2'>
                  <div className='flex w-full'>
                    <span className='text-sm font-[400]'> {selectedValues.length} selected</span>
                  </div>

                  <div className='flex items-center justify-between gap-1'>
                    <XIcon
                      className='mx-2 cursor-pointer text-input'
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                    <ChevronDown size={18} className='text-input' />
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between w-full mx-auto'>
                  <span className='mx-3 text-sm font-[400] text-input'>{placeholder}</span>
                  <ChevronDown size={18} className='mx-2 cursor-pointer text-input' />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id='multiselect-popover-content'
            className='p-0 border pointer-events-auto border-input'
            style={{ width: `min(${popoverWidth}px, 90vw)` }}
            align='start'
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <Command>
              <CommandInput placeholder='Search...' onKeyDown={handleInputKeyDown} onValueChange={(value) => setSearchTerm(value)} />
              <CommandList>
                <CommandEmpty>
                  {searchTerm ? (
                    <button
                      className='w-full text-sm underline rounded-md hover:bg-accent'
                      onClick={(e) => {
                        e.stopPropagation();
                        const newOption = { label: searchTerm, value: searchTerm };
                        onValueChange([...selectedValues, newOption.value]);
                        setSelectedValues([...selectedValues, newOption.value]);
                        setSearchTerm('');
                        setIsPopoverOpen(false);
                      }}
                    >
                      Add "{searchTerm}"
                    </button>
                  ) : (
                    'No results found.'
                  )}
                </CommandEmpty>
                <CommandGroup>
                  {props.selectAllEnabled && (
                    <CommandItem key='all' onSelect={toggleAll} className='cursor-pointer data-[selected=true]:bg-background'>
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          selectedValues.length === options.length ? 'text-primary-foreground bg-primary' : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className='w-4 h-4' />
                      </div>
                      <span>(Select All)</span>
                    </CommandItem>
                  )}
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className='cursor-pointer data-[selected=true]:bg-background data-[selected=true]:hover:bg-accent'
                        data-selected={isSelected}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected ? 'text-primary-foreground bg-primary' : 'opacity-50 [&_svg]:invisible',
                          )}
                        >
                          <CheckIcon className='w-4 h-4 text-white' />
                        </div>
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandGroup>
                  <div className='flex items-center justify-between'>
                    {selectedValues.length > 0 && (
                      <CommandItem
                        onSelect={handleClear}
                        className='flex-1 cursor-pointer justify-center data-[selected=true]:bg-background'
                      >
                        Clear
                      </CommandItem>
                    )}
                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      className='max-w-full flex-1 cursor-pointer justify-center data-[selected=true]:bg-background'
                    >
                      Close
                    </CommandItem>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className='flex flex-wrap w-full gap-1' style={{ width: `min(${popoverWidth}px, 90vw)` }}>
          {selectedValues.length > 0 && (
            <>
              {selectedValues.slice(0, maxCount).map((value) => {
                const option = options.find((o) => o.value === value);
                return (
                  <SelectedBadge
                    key={value}
                    label={option?.label ?? value}
                    onClick={() => {
                      toggleOption(value);
                    }}
                  />
                );
              })}
            </>
          )}
          {selectedValues.length > maxCount && (
            <SelectedBadge
              label={`+ ${selectedValues.length - maxCount} more`}
              onClick={() => {
                clearExtraOptions();
              }}
            />
          )}
        </div>
      </div>
    );
  },
);

MultiSelect.displayName = 'MultiSelect';

interface SelectedBadge {
  label: string;
  onClick: () => void;
}

function SelectedBadge(props: SelectedBadge) {
  return (
    <Badge className={cn('border-1 flex gap-2 border border-input bg-transparent text-foreground hover:bg-transparent')}>
      <span>{props.label}</span>
      <X
        size={14}
        className='cursor-pointer stroke-[#4E4E4E] hover:stroke-black'
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
      />
    </Badge>
  );
}
