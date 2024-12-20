import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';
import { useSidebarStore } from '@/state';
import { useEffect } from 'react';

export function App() {
  const fetchRounds = useSidebarStore((state) => state.setRounds);
  const loading = useSidebarStore((state) => state.loading);

  useEffect(() => {
    (async function setRounds() {
      fetchRounds();
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen lg:flex-row">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen lg:flex-row">
      <SidebarSection />
      <div className="flex flex-col flex-1">
        <StepsSection />
        <MainSection />
      </div>
    </div>
  );
}
