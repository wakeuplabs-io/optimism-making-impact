import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';

export function App() {
  return (
    <div className='flex flex-col w-screen h-screen lg:flex-row'>
      <SidebarSection />
      <div className='flex flex-col flex-1'>
        <StepsSection />
        <MainSection />
      </div>
      {import.meta.env.DEV && <IsAdminIndicator />}
    </div>
  );
}
