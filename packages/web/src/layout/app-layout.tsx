import { Toaster } from '@/components/ui/toaster';
import { IS_DEVELOPMENT } from '@/config';
import { useRouterObserver } from '@/hooks/use-router-observer';
import { useIsMobile } from '@/hooks/use-tresholds';
import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';
import { cn } from '@/lib/utils';
import { useSidebarStore, useUserStore } from '@/state';
import { useEffect } from 'react';

export function AppLayout() {
  const isMobile = useIsMobile();
  const { initializeObserver } = useRouterObserver();

  useEffect(() => {
    (async () => {
      await useSidebarStore.getState().init();
      await useUserStore.getState().fetchAuth();
      initializeObserver();
    })();
  }, []);

  return (
    <div className='flex flex-col w-screen h-screen overflow-hidden lg:flex-row'>
      <SidebarSection />
      <div
        className={cn('flex flex-1 flex-col-reverse bg-[#F1F4F9] lg:flex-col lg:p-8 lg:px-16', {
          'overflow-y-auto': !isMobile,
          'overflow-hidden': isMobile,
        })}
      >
        <StepsSection />
        <MainSection />
      </div>
      <Toaster />
      {IS_DEVELOPMENT && <IsAdminIndicator />}
    </div>
  );
}
