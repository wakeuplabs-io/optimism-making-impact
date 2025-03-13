import { Input } from './input';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

const ENTER_CHARACTER = 'Enter';
const SPACE_CHARACTER = ' ';

interface Tag {
  value: string;
}

interface MultiSelectInputProps<T extends Tag> {
  value: T[];
  onChange: (value: T[]) => void;
  options?: T[];
  placeholder?: string;
  className?: string;
}

export function MultiSelectInput<T extends Tag>({
  value,
  onChange,
  options = [],
  placeholder = 'Type to search or create...',
  className,
}: MultiSelectInputProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  // Add a key to reset Command component
  const [commandKey, setCommandKey] = useState(0);

  const createTag = useCallback((text: string): T => {
    return {
      value: text.trim(),
    } as T;
  }, []);

  const handleSelect = useCallback(
    (selectedText: string) => {
      const normalizedText = selectedText.trim().toLowerCase();
      const existingTag = value.find((tag) => tag.value.toLowerCase() === normalizedText);

      if (!existingTag) {
        const newTag = options.find((tag) => tag.value.toLowerCase() === normalizedText) || createTag(selectedText);

        onChange([...value, newTag]);
      }

      onInputChange('');
      // Reset Command component state
      setCommandKey((prev) => prev + 1);
      // Keep the dropdown open after selection
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);

      setTimeout(() => {
        scrollInputIntoView();
      }, 0);
    },
    [value, onChange, createTag],
  );

  const onInputChange = useCallback((newInput: string) => {
    setInputValue(newInput);

    const shouldShowOptions = newInput.trim() !== '';
    setOpen(shouldShowOptions);
  }, []);

  const handleRemove = useCallback(
    (tagToRemove: T) => {
      onChange(value.filter((tag) => tag.value.toLowerCase() !== tagToRemove.value.toLowerCase()));
    },
    [onChange, value],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ENTER_CHARACTER || e.key === SPACE_CHARACTER) && inputValue.trim()) {
      e.preventDefault();
      handleSelect(inputValue);
    }
  };

  const scrollInputIntoView = () => inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });

  const filteredOptions = options.filter((tag) => {
    const matchesSearch = tag.value.toLowerCase().includes(inputValue.toLowerCase());
    const notSelected = !value.find((selected) => selected.value.toLowerCase() === tag.value.toLowerCase());
    return matchesSearch && notSelected;
  });

  const showOptions = open && filteredOptions.length > 0;

  return (
    <div className={cn('relative', className)}>
      <div
        className='flex max-h-[90px] min-h-[40px] w-full flex-wrap gap-2 overflow-y-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring'
        onClick={() => inputRef.current?.focus()}
        onFocus={() => scrollInputIntoView()}
      >
        {value.map((tag) => (
          <Badge key={`MS_BADGE_${tag.value}`} className='max-w-full gap-2 px-3 h-7'>
            <span className='truncate'>{tag.value}</span>
            <button
              type='button'
              className='ml-1 rounded-md outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRemove(tag);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove(tag);
              }}
            >
              <X className='w-3 h-3 text-muted-foreground hover:text-foreground' />
              <span className='sr-only'>Remove {tag.value}</span>
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            const value = e.target.value;
            onInputChange(value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setTimeout(() => setOpen(false), 200);
          }}
          placeholder={placeholder}
          className='h-7 w-auto flex-[1_0_auto] border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0'
        />
      </div>
      {showOptions ? (
        <div className='absolute z-10 w-full mt-2 border rounded-md shadow-md bg-popover text-popover-foreground'>
          <Command key={commandKey}>
            <CommandList>
              {filteredOptions.length > 0 && (
                <CommandGroup>
                  {filteredOptions.map((tag) => (
                    <CommandItem key={`MS_OPTION_${tag.value}`} onSelect={() => handleSelect(tag.value)} className='cursor-pointer'>
                      {tag.value}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      ) : null}
    </div>
  );
}
