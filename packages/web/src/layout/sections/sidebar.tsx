import OmiLogo from '@/assets/omi-logo.png';
import WakeUpLogo from '@/assets/wake-up-logo.png';
import { ImageButton } from '@/components/image-button';
import { SideMenu } from '@/components/side-menu';
import { WAKEUP_URL } from '@/config';
import { AddCategoryModal } from '@/features/sidebar/components/add-category-modal';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { CreateRoundModal } from '@/features/sidebar/components/create-round-modal';
import LogosSection from '@/features/sidebar/components/logos-section';
import { Rounds } from '@/features/sidebar/components/rounds';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore, useUserStore } from '@/state';
import { CompleteRound } from '@/types';
import { Menu } from 'lucide-react';

export function SidebarSection() {
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  const roundName = selectedRound?.id ? getRoundName(selectedRound.id) : '';

  if (!selectedRound) {
    return (
      <SidebarContainer title={roundName}>
        <p>Select a round</p>
      </SidebarContainer>
    );
  }

  return (
    <SidebarContainer title={roundName}>
      <SidebarContent round={selectedRound} />
    </SidebarContainer>
  );
}

interface SidebarContainerProps {
  children: React.ReactNode;
  title?: string;
}

function SidebarContainer(props: SidebarContainerProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Render as a Sheet on Mobile
    return (
      <nav className='flex h-28 w-full items-center justify-start gap-4 p-3 lg:static'>
        <SideMenu
          trigger={<Menu className='text-black' />}
          description='Sidebar'
          side='left'
          className='w-[320px] bg-blue-300'
          triggerAsChild
        >
          {props.children}
        </SideMenu>
        <span>{props.title}</span>
      </nav>
    );
  }

  // Render static sidebar on Desktop
  return (
    <div className='w-[320px] overflow-y-auto overflow-x-hidden p-6'>
      <nav className='ml-auto w-[220px] bg-white-high lg:static'>{props.children}</nav>
    </div>
  );
}

interface SidebarContentProps {
  round: CompleteRound;
}

function SidebarContent(props: SidebarContentProps) {
  const addCategory = useSidebarStore((state) => state.addCategory);
  const addRound = useSidebarStore((state) => state.addRound);
  const isAdmin = useUserStore((state) => state.isAdmin);

  return (
    <div className='flex flex-col gap-6'>
      <div className='mb-10 flex justify-center'>
        <img src={OmiLogo} alt='Optimism Making Impact Logo' className='w-[127px]' />
      </div>
      <Rounds />
      {isAdmin && (
        <div className='flex w-full justify-around gap-1'>
          <CreateRoundModal onSave={addRound} />
          <AddCategoryModal roundId={props.round.id} onSave={addCategory} />
        </div>
      )}
      <CategoryList />
      <LogosSection />
      <a href={WAKEUP_URL} target='_blank' rel='noreferrer' className='mt-8'>
        <ImageButton src={WakeUpLogo} alt='WakeUp Logo' className='w-[124px]' />
      </a>
    </div>
  );
}
