import OmiLogo from '@/assets/omi-logo.png';
import { SideMenu } from '@/components/side-menu';
import { CategoryList } from '@/features/sidebar/components/category-list/category-list';
import LogosSection from '@/features/sidebar/components/logos-section';
import { RoundList } from '@/features/sidebar/components/round-list/round-list';
import { SettingsSection } from '@/features/sidebar/components/settings-section/settings-section';
import { WakeUpLogo } from '@/features/sidebar/components/wakeup-logo';
import { useIsMobile } from '@/hooks/use-tresholds';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore } from '@/state';
import { Menu } from 'lucide-react';
import { useMemo } from 'react';

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
          className='w-[308px] overflow-y-auto'
          triggerAsChild
        >
          {props.children}
        </SideMenu>
        <span className='text-2xl font-semibold text-secondary'>{title}</span>
      </nav>
    );
  }

  return <nav className='h-full w-[308px] overflow-y-auto overflow-x-hidden bg-white-high px-8 pt-10 lg:static'>{props.children}</nav>;
}

function SidebarContent() {
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  return (
    <div className='flex h-full flex-col items-start gap-6 pb-16'>
      <img src={OmiLogo} alt='Optimism Making Impact Logo' className='w-[127px]' />
      <div className='flex w-full flex-col justify-start gap-4 md:justify-between'>
        <div className='flex flex-col gap-4'>
          <RoundList />
          <hr />
          {<CategoryList roundId={selectedRound?.id} categories={selectedRound?.categories ?? []} />}
          <hr />
          <LogosSection />
          <hr />
          <SettingsSection />
        </div>
        <WakeUpLogo />
      </div>
    </div>
  );
}
