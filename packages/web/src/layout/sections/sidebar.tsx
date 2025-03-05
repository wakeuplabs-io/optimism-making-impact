import OmiLogo from '@/assets/omi-logo.png';
import WakeUpLogo from '@/assets/wake-up-logo.png';
import { ImageButton } from '@/components/image-button';
import { SideMenu } from '@/components/side-menu';
import { WAKEUP_URL } from '@/config';
import { AuthSection } from '@/features/sidebar/components/auth-section';
import { CategoryList } from '@/features/sidebar/components/category-list';
import LogosSection from '@/features/sidebar/components/logos-section';
import { RoundList } from '@/features/sidebar/components/round-list/round-list';
import SetupModal from '@/features/sidebar/components/setup-modal';
import { useIsMobile } from '@/hooks/use-tresholds';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore } from '@/state';
import { Menu, Settings } from 'lucide-react';
import { useMemo, useState } from 'react';

export function SidebarSection() {
  return (
    <SidebarContainer>
      <SidebarContent />
    </SidebarContainer>
  );
}

interface SidebarContainerProps {
  children: React.ReactNode;
}

function SidebarContainer(props: SidebarContainerProps) {
  const isMobile = useIsMobile();
  const { selectedRound, selectedCategoryId } = useSidebarStore((state) => state);

  //Check if category is selected
  const title = useMemo(() => {
    if (!selectedRound) {
      return 'Round';
    }

    const category = selectedRound.categories.find((category) => category.id === selectedCategoryId);

    if (!category) {
      return getRoundName(selectedRound.id);
    }

    return category.name;
  }, [selectedRound, selectedCategoryId]);

  if (isMobile) {
    return (
      <nav className='flex w-full items-center justify-start gap-12 bg-[#F1F4F9] px-8 pb-7 pt-14 lg:static'>
        <SideMenu
          trigger={<Menu className='h-[50px] w-[50px] text-black' strokeWidth={1} />}
          description='Sidebar'
          side='left'
          className='w-[320px]'
          triggerAsChild
        >
          {props.children}
        </SideMenu>
        <span className='text-2xl font-semibold text-secondary'>{title}</span>
      </nav>
    );
  }

  return <nav className='w-[320px] overflow-y-auto overflow-x-hidden h-full bg-white-high lg:static px-8 pt-10'>{props.children}</nav>;
}

function SidebarContent() {
  const selectedRound = useSidebarStore((state) => state.selectedRound);
  const [open, setOpen] = useState(false);

  return (
    <div className='flex h-full flex-col justify-between items-start gap-6'>
      <img src={OmiLogo} alt='Optimism Making Impact Logo' className='w-[127px]' />
      <div className='flex flex-1 flex-col justify-start md:justify-between gap-8'>
        <div className='flex flex-col gap-4'>
          <RoundList />
          {selectedRound && <CategoryList roundId={selectedRound.id} categories={selectedRound.categories} />}
          <LogosSection />
        </div>
        <>
          <button
            onClick={() => setOpen(true)}
            className='flex w-full items-center gap-3 rounded-lg px-4 py-2 text-[#4e4e4e] transition-colors hover:bg-[#f1f4f9]'
          >
            <Settings className='h-4 w-4' />
            <span className='text-sm'>Setup</span>
          </button>
          <SetupModal open={open} onOpenChange={setOpen} />
        </>
        <AuthSection />
      </div>
      <a href={WAKEUP_URL} target='_blank' rel='noreferrer'>
        <ImageButton src={WakeUpLogo} alt='WakeUp Logo' className='w-[124px]' />
      </a>
    </div>
  );
}
