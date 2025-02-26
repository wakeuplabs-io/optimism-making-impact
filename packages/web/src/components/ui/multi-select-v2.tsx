import { X } from 'lucide-react';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCallback, useRef, useState } from 'react';
import { Input } from './input';

interface Tag {
  id: string;
  text: string;
}

interface MultiSelectInputV2Props {
  value: Tag[];
  onChange: (value: Tag[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelectInputV2({ value, onChange, placeholder = 'Type to search or create...', className }: MultiSelectInputV2Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  // Add a key to reset Command component
  const [commandKey, setCommandKey] = useState(0);

  // Example predefined tags - in a real app, these might come from an API or database
  const predefinedTags: Tag[] = [
    { id: '1', text: 'React' },
    { id: '2', text: 'TypeScript' },
    { id: '3', text: 'JavaScript' },
    { id: '4', text: 'Node.js' },
    { id: '5', text: 'Next.js' },
  ];

  const createTag = useCallback(
    (text: string): Tag => ({
      id: `new-${Date.now()}`,
      text: text.trim(),
    }),
    [],
  );

  const handleSelect = useCallback(
    (selectedText: string) => {
      const normalizedText = selectedText.trim().toLowerCase();
      const existingTag = value.find((tag) => tag.text.toLowerCase() === normalizedText);

      if (!existingTag) {
        const newTag = predefinedTags.find((tag) => tag.text.toLowerCase() === normalizedText) || createTag(selectedText);

        onChange([...value, newTag]);
      }

      setInputValue('');
      // Reset Command component state
      setCommandKey((prev) => prev + 1);
      // Keep the dropdown open after selection
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    },
    [value, onChange, createTag],
  ); // Removed predefinedTags from dependencies

  const handleRemove = useCallback(
    (tagToRemove: Tag) => {
      onChange(value.filter((tag) => tag.id !== tagToRemove.id));
    },
    [onChange, value],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && inputValue.trim()) {
      e.preventDefault();
      handleSelect(inputValue);
    }
  };

  const filteredTags = predefinedTags.filter((tag) => {
    const matchesSearch = tag.text.toLowerCase().includes(inputValue.toLowerCase());
    const notSelected = !value.find((selected) => selected.id === tag.id);
    return matchesSearch && notSelected;
  });

  return (
    <div className={cn('relative', className)}>
      <div
        className='flex min-h-[40px] w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring'
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <Badge key={tag.id} className='gap-2 px-3 h-7'>
            {tag.text}
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
              onClick={() => handleRemove(tag)}
            >
              <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
              <span className='sr-only'>Remove {tag.text}</span>
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setTimeout(() => setOpen(false), 200);
          }}
          placeholder={placeholder}
          className='h-7 flex-1 bg-transparent border-none focus-visible:ring-0 outline-none shadow-none p-0'
        />
      </div>
      {open && inputValue ? (
        <div className='absolute z-10 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md'>
          <Command key={commandKey}>
            <CommandList>
              {filteredTags.length > 0 && (
                <CommandGroup>
                  {filteredTags.map((tag) => (
                    <CommandItem key={tag.id} onSelect={() => handleSelect(tag.text)} className='cursor-pointer'>
                      {tag.text}
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
