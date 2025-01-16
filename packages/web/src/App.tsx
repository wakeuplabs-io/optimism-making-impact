import { Toaster } from '@/components/ui/toaster';
import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';

export function App() {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden md:flex-row'>
      <SidebarSection />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <StepsSection />
        <MainSection />
      </div>
      <Toaster />
      {import.meta.env.DEV && <IsAdminIndicator />}
    </div>
  );
}
