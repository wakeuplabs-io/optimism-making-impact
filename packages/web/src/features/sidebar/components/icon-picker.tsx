import { LucideProps } from 'lucide-react';
import { ComponentType, useMemo, useState, useRef, useEffect } from 'react';

interface IconPickerContentProps {
  selectedIcon: string;
  modalIcons: Record<string, React.ComponentType>;
  onSelect(iconName: string): void;
  onClose(e: React.MouseEvent): void;
}

function IconPickerContent({ selectedIcon, modalIcons, onSelect, onClose }: IconPickerContentProps) {
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close the overlay when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        event.preventDefault();
        onClose(event as unknown as React.MouseEvent);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filteredIcons = useMemo(() => {
    return Object.keys(modalIcons).filter((iconName) => new RegExp(search, 'i').test(iconName));
  }, [search, modalIcons]);

  console.log('Math.floor(window.innerWidth / 64): ', Math.floor(window.innerWidth / 64));

  return (
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
          <div className={`mt-2 grid max-h-[200px] grid-cols-${Math.floor(window.innerWidth / 64)} gap-2 overflow-y-auto sm:grid-cols-8`}>
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
  );
}

interface IconPickerProps {
  modalIcons: Record<string, React.ComponentType>;
  onSelect(iconName: string): void;
  selectedIcon: string;
  isVisible: boolean;
  onClose(e: React.MouseEvent): void;
}

export function IconPicker({ modalIcons, onSelect, isVisible, selectedIcon, onClose }: IconPickerProps) {
  const handleSelect = (iconName: string) => {
    onSelect(iconName);
  };

  return (
    <div className='relative'>
      {isVisible && <IconPickerContent selectedIcon={selectedIcon} modalIcons={modalIcons} onSelect={handleSelect} onClose={onClose} />}
    </div>
  );
}
