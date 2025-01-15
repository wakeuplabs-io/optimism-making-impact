import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useSidebarStore } from '@/state';
import { ChevronDown } from 'lucide-react';

/**
 * @deprecated use the new select component: packages/web/src/components/select.tsx
 */
export function DropdownMenu() {
  const roundsState = useSidebarStore((state) => state);

  return (
    <nav>
      <Select onValueChange={(val) => roundsState.setSelectedRound(+val)}>
        <SelectTrigger className='w-[125px] border-none bg-transparent text-lg leading-6 text-dark-medium shadow-none focus:ring-0 2xl:text-xl'>
          <div className='flex items-center gap-8'>
            <p className='text-xl font-normal'>{roundsState.selectedRound.name}</p>
            <ChevronDown size={18} color='black' />
          </div>
        </SelectTrigger>
        <SelectContent className='border-none bg-background'>
          {roundsState.rounds.map((round) => (
            <SelectItem
              key={round.id}
              className='text-sm cursor-pointer h-14 text-dark-low focus:bg-background-brighter focus:text-dark-medium 2xl:text-base'
              value={round.id.toString()}
            >
              {round.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </nav>
  );
}
