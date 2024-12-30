import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSidebarStore } from '@/state';

export function SidebarSection() {
  const roundsState = useSidebarStore((state) => state);

  return (
    <nav className="absolute bg-green-100 p-8 lg:static lg:h-full lg:w-[320px]">
      <Select onValueChange={(val: string) =>roundsState.setSelectedRound(+val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a round" />
        </SelectTrigger>
        <SelectContent>
          {roundsState.rounds.map((round) => (
            <SelectItem key={round.id} value={round.id.toString()}>
              {round.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {roundsState.selectedRound.id}
    </nav>
  );
}
