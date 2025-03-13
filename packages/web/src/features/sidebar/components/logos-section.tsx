import RetroList from '@/assets/retro-list.svg';
import VoteHere from '@/assets/vote-here.svg';
import { SidebarLinkButton } from '@/components/sidebar-link-button';
import { useSidebarStore, useUserStore } from '@/state';

export default function LogosSection() {
  const { selectedRound: selectedRound, editRound } = useSidebarStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  if (!selectedRound) {
    return null;
  }

  return (
    <div className='flex w-full gap-2'>
      {selectedRound.link1 && (
        <SidebarLinkButton
          src={VoteHere}
          link={selectedRound.link1}
          isAdmin={isAdmin}
          onSubmit={(data) => editRound(selectedRound.id, { link1: data.link })}
          className='w-1/2'
        />
      )}
      {selectedRound.link2 && (
        <SidebarLinkButton
          src={RetroList}
          link={selectedRound.link2}
          isAdmin={isAdmin}
          onSubmit={(data) => editRound(selectedRound.id, { link2: data.link })}
          className='w-1/2'
        />
      )}
    </div>
  );
}
