import RetroList from '@/assets/retro-list.svg';
import VoteHere from '@/assets/vote-here.svg';
import { SidebarLinkButton } from '@/components/sidebar-link-button';
import { useRounds } from '@/hooks/use-rounds';
import { useUser } from '@/hooks/use-user';
import { Link1Schema, Link2Schema } from '@optimism-making-impact/schemas';

export default function LogosSection() {
  const { selectedRound, handleEditRound } = useRounds();
  const { isAdminModeEnabled: isAdmin } = useUser();

  return (
    <div className='flex w-full gap-2'>
      <SidebarLinkButton
        src={VoteHere}
        disabled={!selectedRound}
        link={selectedRound?.link1 ?? ''}
        isAdmin={isAdmin}
        onSubmit={(data) => selectedRound && handleEditRound(selectedRound.id, { link1: (data as Link1Schema).link1 })}
        className='w-1/2'
      />
      <SidebarLinkButton
        src={RetroList}
        disabled={!selectedRound}
        link={selectedRound?.link2 ?? ''}
        isAdmin={isAdmin}
        onSubmit={(data) => selectedRound && handleEditRound(selectedRound.id, { link2: (data as Link2Schema).link2 })}
        className='w-1/2'
      />
    </div>
  );
}
