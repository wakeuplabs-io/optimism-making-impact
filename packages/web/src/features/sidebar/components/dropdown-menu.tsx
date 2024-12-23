import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSidebarStore } from '@/state';

export function DropdownMenu() {
  const roundsState = useSidebarStore((state) => state);

  return (
    <nav>
      <Select onValueChange={roundsState.setSelectedRound}>
        <SelectTrigger className="w-[125px] border-none bg-transparent text-lg leading-6 text-dark-medium shadow-none focus:ring-0 2xl:text-xl">
          <SelectValue placeholder={roundsState.selectedRound.name} />
        </SelectTrigger>
        <SelectContent className="border-none bg-background">
          {roundsState.rounds.map((round) => (
            <SelectItem
              key={round.id}
              className="h-14 cursor-pointer text-sm text-dark-low focus:bg-background-brighter focus:text-dark-medium 2xl:text-base"
              value={round.id}
            >
              {round.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </nav>
  );
}
