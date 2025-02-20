import { useState } from 'react';
import * as LucideIcons from 'lucide-react';

const iconMap: Record<string, React.ComponentType> = Object.fromEntries(
  Object.entries(LucideIcons)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => typeof value === 'function')
    .map(([key, value]) => [key.toLowerCase(), value as React.ComponentType])
);

export function IconPicker({ selectedIcon, onSelect }: { selectedIcon: string; onSelect: (iconName: string) => void }) {
  const [search, setSearch] = useState('dot');

  const filteredIcons = Object.keys(iconMap).filter((iconName) =>
    new RegExp(search, 'i').test(iconName)
  );
  console.log({filteredIcons})

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

        <div className="grid grid-cols-6 gap-2 mt-2 max-h-[200px] overflow-y-auto">
          {filteredIcons.length > 0 ? (
            filteredIcons.slice(0, 30).map((iconName) => {
              const IconComponent = iconMap[iconName];

              return (
                <button
                  key={iconName}
                  onClick={() => {
                    onSelect(iconName);
                  }}
                  className={`flex items-center justify-center h-10 w-10 rounded-lg border ${
                    selectedIcon === iconName ? 'border-red-500 bg-red-100' : 'border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent />
                </button>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm col-span-6 text-center mt-2">No icons found</p>
          )}
        </div>
      </div>
    </div>
  );
}
