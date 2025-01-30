import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react';
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

    const handleTogglePopover = () => {
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
              ref={selectRef}
              {...props}
              onClick={handleTogglePopover}
              className={cn(
                'flex h-auto min-h-9 w-full items-center justify-between rounded-md border border-input bg-inherit p-1 [&_svg]:pointer-events-auto',
                className,
              )}
            >
              {selectedValues.length > 0 ? (
                <div className='flex w-full items-center justify-between px-2'>
                  <div className='flex w-full'>
                    <span className='text-sm font-[400]'> {selectedValues.length} selected</span>
                  </div>

                  <div className='flex items-center justify-between gap-1'>
                    <XIcon
                      className='mx-2 h-4 cursor-pointer text-muted-foreground'
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                    <ChevronDown className='h-4 cursor-pointer text-muted-foreground' />
                  </div>
                </div>
              ) : (
                <div className='mx-auto flex w-full items-center justify-between'>
                  <span className='mx-3 text-sm font-[400]'>{placeholder}</span>
                  <ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id='multiselect-popover-content'
            className='border border-input p-0'
            style={{ width: `${popoverWidth}px` }}
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
                      className='w-full rounded-md text-sm underline hover:bg-accent'
                      onClick={(e) => {
                        e.stopPropagation();
                        const newOption = { label: searchTerm, value: searchTerm.toLowerCase() };
                        onValueChange([...selectedValues, newOption.value]);
                        setSelectedValues([...selectedValues, newOption.value]);
                        setSearchTerm(''); // Clear the search bar
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
                  <CommandItem key='all' onSelect={toggleAll} className='cursor-pointer'>
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        selectedValues.length === options.length ? 'text-primary-foreground bg-primary' : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className='h-4 w-4' />
                    </div>
                    <span>(Select All)</span>
                  </CommandItem>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem key={option.value} onSelect={() => toggleOption(option.value)} className='cursor-pointer'>
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            isSelected ? 'text-primary-foreground bg-primary' : 'opacity-50 [&_svg]:invisible',
                          )}
                        >
                          <CheckIcon className='h-4 w-4' />
                        </div>
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className='flex items-center justify-between'>
                    {selectedValues.length > 0 && (
                      <CommandItem onSelect={handleClear} className='flex-1 cursor-pointer justify-center'>
                        Clear
                      </CommandItem>
                    )}
                    <CommandItem onSelect={() => setIsPopoverOpen(false)} className='max-w-full flex-1 cursor-pointer justify-center'>
                      Close
                    </CommandItem>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className='flex flex-wrap gap-1'>
          {selectedValues.length > 0 && (
            <>
              {selectedValues.slice(0, maxCount).map((value) => {
                const option = options.find((o) => o.value === value);
                return (
                  <SelectedBardge
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
            <SelectedBardge
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

function SelectedBardge(props: SelectedBadge) {
  return (
    <Badge className={cn('border-1 border border-input bg-transparent text-foreground hover:bg-transparent')}>
      <span>{props.label}</span>
      <XCircle
        className='ml-2 h-4 w-4 cursor-pointer'
        onClick={(e) => {
          e.stopPropagation();
          props.onClick();
        }}
      />
    </Badge>
  );
}
