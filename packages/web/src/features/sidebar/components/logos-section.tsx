import RetroList from '@/assets/retro-list.png';
import VoteHere from '@/assets/vote-here.png';
import { SidebarLinkButton } from '@/components/sidebar-link-button';
import { useSidebarStore, useUserStore } from '@/state';

export default function LogosSection() {
  const { selectedRound, editRound } = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <div className='flex flex-col w-full gap-4'>
      <SidebarLinkButton
        src={VoteHere}
        selectedRound={selectedRound}
        isAdmin={isAdmin}
        onClick={(newLink: string) => editRound(selectedRound.id, { link1: newLink })}
        linkNumber={1}
      />
      <SidebarLinkButton
        src={RetroList}
        selectedRound={selectedRound}
        isAdmin={isAdmin}
        onClick={(newLink: string) => editRound(selectedRound.id, { link2: newLink })}
        linkNumber={2}
      />
    </div>
  );
}
