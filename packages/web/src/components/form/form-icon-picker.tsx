import { FormInputWrapper } from './form-input';
import { IconPicker } from '@/features/sidebar/components/icon-picker';
import { ILucideIcons } from '@/hooks/use-icons';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { createElement, useState } from 'react';

interface FormIconPickerProps {
  label?: string;
  error?: string;
  selectedIcon: string;
  modalIcons: ILucideIcons;
  onSelect(iconName: string): void;
}

export function FormIconPicker({ error, label = 'icon', selectedIcon, modalIcons, onSelect }: FormIconPickerProps) {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

  return (
    <FormInputWrapper error={error}>
      <div className='flex flex-col'>
        <div className='flex flex-col gap-1.5'>
          {label && (
            <Label htmlFor={'icon'} className='text-xs font-normal text-[#BEBEBE]'>
              label
            </Label>
          )}
          <button
            id={label}
            type='button'
            className={cn('flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-md border border-gray-300', {
              'text-[#FF0420]': !!selectedIcon,
            })}
            onClick={() => setIsIconPickerOpen((prev) => !prev)}
          >
            {modalIcons[selectedIcon] && createElement(modalIcons[selectedIcon])}
          </button>
        </div>
        <IconPicker
          isVisible={isIconPickerOpen}
          selectedIcon={selectedIcon}
          modalIcons={modalIcons}
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
