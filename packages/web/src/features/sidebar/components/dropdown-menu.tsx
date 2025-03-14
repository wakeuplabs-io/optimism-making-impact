import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
import { ChevronDown } from 'lucide-react';

/**
 * @deprecated use the new select component: packages/web/src/components/select.tsx
 */
export function RoundsSelect() {
  const roundsState = useSidebarStore((state) => state);

  const currentRoundName = roundsState.selectedRound?.id ? getRoundName(roundsState.selectedRound.id) : '';

  return (
    <nav>
      <Select onValueChange={(val) => roundsState.setSelectedRound(+val)} value={roundsState.selectedRound?.id.toString()}>
        <SelectTrigger className='w-[125px] border-none bg-transparent text-lg leading-6 text-dark-medium shadow-none focus:ring-0 2xl:text-xl'>
          <div className='flex items-center gap-8'>
            <p className='text-xl font-normal'>{currentRoundName}</p>
            <ChevronDown size={18} color='black' />
          </div>
        </SelectTrigger>
        <SelectContent className='border-none bg-background'>
          {roundsState.rounds.map((round) => (
            <SelectItem
              key={round.id}
              className='h-14 cursor-pointer text-sm text-dark-low focus:bg-background-brighter focus:text-dark-medium 2xl:text-base'
              value={round.id.toString()}
            >
              {getRoundName(round.id)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </nav>
  );
}
