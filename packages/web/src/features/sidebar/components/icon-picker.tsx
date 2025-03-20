import { cn } from '@/lib/utils';
import { LucideIcon, LucideProps } from 'lucide-react';
import React, { ComponentType, useMemo, useState, useRef, useEffect } from 'react';

interface IconPickerProps {
  selectedIcon: string;
  modalIcons: { [k: string]: LucideIcon };
  onSelect(iconName: string): void;
  onClose(e: React.MouseEvent): void;
  isVisible: boolean;
}

export const IconPicker = React.memo(function IconPicker({ selectedIcon, modalIcons, onSelect, onClose, isVisible }: IconPickerProps) {
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close the overlay when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClose(event as unknown as React.MouseEvent);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredIcons = useMemo(() => {
    return Object.keys(modalIcons).filter((iconName) => new RegExp(search, 'i').test(iconName));
  }, [search, modalIcons]);

  const columns = Math.min(8, Math.floor((window.innerWidth * 0.8) / 64));

  return (
    <div className='relative'>
      <div
        className={cn(
          'absolute left-0 z-50 mt-2 w-64 rounded-lg bg-white p-2 shadow-lg transition-all duration-200',
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-95 opacity-0',
        )}
      >
        <div ref={wrapperRef} style={{ position: 'absolute' }} className='z-50 w-[90vw] rounded bg-white p-4 shadow-lg sm:w-[456px]'>
          <div className='flex h-full w-full flex-col gap-2'>
            <div className='rounded-lg border border-gray-300 p-3'>
              <input
                type='text'
                placeholder='Search icon...'
                className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500'
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <div
                className={cn('mt-2 grid max-h-[200px] gap-2 overflow-y-auto')}
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
              >
                {filteredIcons.length > 0 ? (
                  filteredIcons.slice(0, 1000).map((iconName) => {
                    const IconComponent = modalIcons[iconName] as ComponentType<LucideProps>;
                    return (
                      <button
                        key={iconName}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelect(iconName);
                        }}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border sm:h-10 sm:w-10 ${
                          selectedIcon === iconName ? 'border-red-500 bg-red-100' : 'border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent />
                      </button>
                    );
                  })
                ) : (
                  <p className='col-span-full mt-2 text-center text-sm text-gray-500'>No icons found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
