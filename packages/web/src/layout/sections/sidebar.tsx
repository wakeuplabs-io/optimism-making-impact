import WakeUpLogo from '@/assets/wake-up-logo.png';
import { CategoryList } from '@/features/sidebar/components/category-list';
import { Logo } from '@/features/sidebar/components/logo';
import LogosSection from '@/features/sidebar/components/logos-section';
import { Rounds } from '@/features/sidebar/components/rounds';
import { useSidebarStore } from '@/state';
import { useEffect } from 'react';

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
  return <nav className='absolute h-full w-[320px] bg-white-high p-6 lg:static'>{props.children}</nav>;
}

function SidebarContent() {
  const { setRounds, setCategories, loading } = useSidebarStore((state) => state);

  useEffect(() => {
    setRounds();
    setCategories();
  }, []);

  if (loading) {
    return (
      <span>
        <div className='flex flex-col items-center justify-center h-full gap-6'>Loading...</div>
      </span>
    );
  }

  return (
    <div className='flex flex-col h-full gap-6'>
      <Logo />
      <Rounds />
      <CategoryList />
      <LogosSection />
      <img src={WakeUpLogo} alt='' className='w-[124px]' />
    </div>
  );
}
