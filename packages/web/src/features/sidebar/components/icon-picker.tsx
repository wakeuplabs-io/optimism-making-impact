import { useMemo, useState } from 'react';

interface IconPickerProps {
  selectedIcon: string;
  modalIcons: Record<string, React.ComponentType>;
  onSelect: (iconName: string) => void;
}

export function IconPicker({ selectedIcon, modalIcons, onSelect }: IconPickerProps) {
  const [search, setSearch] = useState('');

  const filteredIcons = useMemo(() => {
    return Object.keys(modalIcons).filter((iconName) =>
      new RegExp(search, 'i').test(iconName)
    );
  }, [search, modalIcons]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="border border-gray-300 rounded-lg p-3">
        <input
          type="text"
          placeholder="Search icon..."
          className="text-sm text-gray-500 w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-2 max-h-[200px] overflow-y-auto">
  {filteredIcons.length > 0 ? (
    filteredIcons.slice(0, 30).map((iconName) => {
      const IconComponent = modalIcons[iconName];

      return (
        <button
          key={iconName}
          onClick={() => {
            onSelect(iconName);
          }}
          className={`flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-lg border ${
            selectedIcon === iconName ? 'border-red-500 bg-red-100' : 'border-gray-300 hover:bg-gray-200'
          }`}
        >
          <IconComponent />
        </button>
      );
    })
  ) : (
    <p className="text-gray-500 text-sm col-span-full text-center mt-2">No icons found</p>
  )}
</div>

      </div>
    </div>
  );
}
