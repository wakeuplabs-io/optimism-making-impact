import { IconWithDefault } from '../icon-with-default';
import { FormInputWrapper } from './form-input';
import { IconPicker } from '@/features/sidebar/components/icon-picker';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

interface FormIconPickerProps {
  label?: string;
  error?: string;
  selectedIcon: string;
  onSelect(iconName: string): void;
}

export function FormIconPicker({ error, label = 'Icon', selectedIcon, onSelect }: FormIconPickerProps) {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  return (
    <FormInputWrapper error={error}>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-1.5'>
          {label && (
            <Label htmlFor={'icon'} className='text-xs font-normal text-[#BEBEBE]'>
              {label}
            </Label>
          )}
          <div
            id={label}
            role='button'
            className={cn('flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300', {
              'text-[#FF0420]': !!selectedIcon,
            })}
            onClick={() => setIsIconPickerOpen((prev) => !prev)}
          >
            <IconWithDefault src={selectedIcon} />
          </div>
        </div>
        <IconPicker
          isVisible={isIconPickerOpen}
          selectedIcon={selectedIcon}
          onSelect={(icon: string) => {
            setIsIconPickerOpen(false);
            onSelect(icon);
          }}
          onClose={() => setIsIconPickerOpen(false)}
        />
      </div>
    </FormInputWrapper>
  );
}
