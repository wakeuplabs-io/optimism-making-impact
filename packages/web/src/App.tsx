import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';

export function App() {
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <SidebarSection />
      <div className="flex flex-col flex-1">
        <StepsSection />
        <MainSection />
      </div>
    </div>
  );
}
