import WakeUpLogo from '@/assets/wake-up-logo.png';
import { ImageButton } from '@/components/image-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MOBILE_THRESHOLD, WAKEUP_URL } from '@/config';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { Logo } from '@/features/sidebar/components/logo';
import LogosSection from '@/features/sidebar/components/logos-section';
import { Rounds } from '@/features/sidebar/components/rounds';
import { useSidebarStore } from '@/state';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

export function SidebarSection() {
  const title = useSidebarStore((state) => state.selectedRound.name);

  return (
    <SidebarContainer title={title}>
      <SidebarContent />
    </SidebarContainer>
  );
}

interface SidebarContainerProps {
  children: React.ReactNode;
  title?: string;
}

function SidebarContainer(props: SidebarContainerProps) {
  const { width = 0 } = useWindowSize();
  const isMobile = width < MOBILE_THRESHOLD;

  if (isMobile) {
    // Render as a Sheet on Mobile
    return (
      <nav className='flex h-28 w-full items-center justify-start gap-4 p-3 lg:static'>
        <Sheet>
          <SheetTrigger asChild>
            <Menu className='text-black' />
          </SheetTrigger>

          <SheetContent side='left' className='w-[320px]'>
            {props.children}
          </SheetContent>
        </Sheet>
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
  const { setRounds, setCategories } = useSidebarStore((state) => state);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await setRounds();
      await setCategories();
      setInitialLoading(false);
    })();
  }, []);

  if (initialLoading) {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-6'>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      <Logo />
      <Rounds />
      <CategoryList />
      <LogosSection />
      <a href={WAKEUP_URL} target='_blank' rel='noreferrer'>
        <ImageButton src={WakeUpLogo} alt='WakeUp Logo' className='w-[124px]' />
      </a>
    </div>
  );
}
