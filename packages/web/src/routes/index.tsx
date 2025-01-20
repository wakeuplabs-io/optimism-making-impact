import { Toaster } from '@/components/ui/toaster';
import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';
import { useSidebarStore } from '@/state';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

const indexRouteSearchParamsSchema = z.object({
  roundId: z.number().min(1).optional(),
});

type IndexRouteSearchParams = z.infer<typeof indexRouteSearchParamsSchema>;

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: (search): IndexRouteSearchParams => {
    const parsed = indexRouteSearchParamsSchema.safeParse(search);
    return { roundId: parsed.data?.roundId };
  },
});

function Index() {
  const search = Route.useSearch();

  // Set the initial state
  useEffect(() => {
    (async () => {
      await useSidebarStore.getState().fetchData();
      if (search.roundId) useSidebarStore.getState().setSelectedRound(search.roundId);
    })();
  }, []);

  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden lg:flex-row'>
      <SidebarSection />
      <div className='flex flex-1 flex-col-reverse overflow-hidden lg:flex-col'>
        <StepsSection />
        <MainSection />
      </div>
      <Toaster />
      {import.meta.env.DEV && <IsAdminIndicator />}
    </div>
  );
}
