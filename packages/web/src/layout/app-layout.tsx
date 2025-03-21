import { Toaster } from '@/components/ui/toaster';
import { IS_DEVELOPMENT } from '@/config';
import { RoundsProvider } from '@/contexts/rounds/rounds-provider';
import { StepsProvider } from '@/contexts/steps/steps-provider';
import { useIsMobile } from '@/hooks/use-tresholds';
import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <RoundsProvider>
      <StepsProvider>
        <div className='flex h-screen w-screen flex-col overflow-hidden lg:flex-row'>
          <SidebarSection />
          <div
            className={cn('flex flex-1 flex-col-reverse bg-[#F1F4F9] lg:flex-col lg:pb-8 lg:px-16', {
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
      </StepsProvider>
    </RoundsProvider>
  );
}
