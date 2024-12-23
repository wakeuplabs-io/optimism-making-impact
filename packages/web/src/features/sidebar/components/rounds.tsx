import { AddNewContent } from '@/components/add-new-content';
import { DropdownMenu } from '@/features/sidebar/components/dropdown-menu';
import { useSidebarStore } from '@/state';

export function Rounds() {
  const roundsState = useSidebarStore((state) => state);

  return (
    <div className="grid gap-2">
      <DropdownMenu />
      <AddNewContent buttonText="Add new round" addNewContent={roundsState.addRound} />
    </div>
  );
}
