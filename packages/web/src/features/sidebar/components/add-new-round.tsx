import { AddNew } from '@/components/add-new';
import { useSidebarStore } from '@/state';

export function AddNewRound() {
  const roundsState = useSidebarStore((state) => state);

  function handleOnClick() {
    roundsState.addRound();
  }

  return <AddNew text="Add new round" onClick={handleOnClick} />;
}
