import { useMemo, useState } from 'react';

interface IconPickerProps {
  selectedIcon: string;
  modalIcons: Record<string, React.ComponentType>;
  onSelect: (iconName: string) => void;
}

export function IconPicker({ selectedIcon, modalIcons, onSelect }: IconPickerProps) {
  const [search, setSearch] = useState('');

  const filteredIcons = useMemo(() => {
    return Object.keys(modalIcons).filter((iconName) => new RegExp(search, 'i').test(iconName));
  }, [search, modalIcons]);

  return (
    <div className='flex h-full w-full flex-col gap-2'>
      <div className='rounded-lg border border-gray-300 p-3'>
        <input
          type='text'
          placeholder='Search icon...'
          className='w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-red-500'
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <div className='mt-2 grid max-h-[200px] grid-cols-5 gap-2 overflow-y-auto'>
          {filteredIcons.length > 0 ? (
            filteredIcons.slice(0, 1000).map((iconName) => {
              const IconComponent = modalIcons[iconName];

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
  );
}
