import RetroList from '@/assets/retro-list.png';
import VoteHere from '@/assets/vote-here.png';
import { SidebarLinkButton } from '@/components/sidebar-link-button';
import { useSidebarStore, useUserStore } from '@/state';

export default function LogosSection() {
  const { selectedRound: selectedRound, editRound } = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.user.isAdmin);

  if (!selectedRound) {
    return null;
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <SidebarLinkButton
        src={VoteHere}
        link={selectedRound.link1}
        isAdmin={isAdmin}
        onClick={(url: string) => editRound(selectedRound.id, { link1: url })}
      />
      <SidebarLinkButton
        src={RetroList}
        link={selectedRound.link2}
        isAdmin={isAdmin}
        onClick={(url: string) => editRound(selectedRound.id, { link2: url })}
      />
    </div>
  );
}
