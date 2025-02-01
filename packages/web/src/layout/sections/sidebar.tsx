import WakeUpLogo from '@/assets/wake-up-logo.png';
import { ImageButton } from '@/components/image-button';
import { SideMenu } from '@/components/side-menu';
import { WAKEUP_URL } from '@/config';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { Logo } from '@/features/sidebar/components/logo';
import LogosSection from '@/features/sidebar/components/logos-section';
import { Rounds } from '@/features/sidebar/components/rounds';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore } from '@/state';
import { Menu } from 'lucide-react';

export function SidebarSection() {
  const selectedRound = useSidebarStore((state) => state.selectedRound);

  const roundName = selectedRound?.id ? getRoundName(selectedRound.id) : '';

  return (
    <SidebarContainer title={roundName}>
      <SidebarContent />
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
      <nav className='flex items-center justify-start w-full gap-4 p-3 h-28 lg:static'>
        <SideMenu trigger={<Menu className='text-black' />} description='Sidebar' side='left' className='w-[320px]' triggerAsChild>
          {props.children}
        </SideMenu>
        <span>{props.title}</span>
      </nav>
    );
  }

  // Render static sidebar on Desktop
  return (
    <div className='w-[320px] overflow-y-auto overflow-x-hidden'>
      <nav className='w-[320px] bg-white-high p-6 lg:static'>{props.children}</nav>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className='flex flex-col gap-6'>
      <Logo />
      <Rounds />
      <CategoryList />
      <LogosSection />
      <a href={WAKEUP_URL} target='_blank' rel='noreferrer' className='mx-auto mt-8'>
        <ImageButton src={WakeUpLogo} alt='WakeUp Logo' className='w-[124px]' />
      </a>
    </div>
  );
}
