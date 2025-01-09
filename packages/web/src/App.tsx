import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSection } from '@/layout/sections/main';
import { StepsSection } from '@/layout/sections/steps';
import { Sidebar } from '@/layouts/sidebar';
import { useSidebarStore } from '@/state';
import { useEffect } from 'react';

export function App() {
  const fetchRounds = useSidebarStore((state) => state.setRounds);
  const fetchCategories = useSidebarStore((state) => state.setCategories);
  const loading = useSidebarStore((state) => state.loading);

  useEffect(() => {
    (async function setRounds() {
      fetchRounds();
    })();
    fetchCategories();
  }, [fetchRounds, fetchCategories]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center lg:flex-row">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <StepsSection />
        <MainSection />
      </div>
      {import.meta.env.DEV && <IsAdminIndicator />}
    </div>
  );
}
