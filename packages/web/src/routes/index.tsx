import { Toaster } from '@/components/ui/toaster';
import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSectionLayout } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';
import { useSidebarStore, useUserStore } from '@/state';
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
      await useSidebarStore.getState().init();
      await useUserStore.getState().fetchAuth();
      if (search.roundId) useSidebarStore.getState().setSelectedRound(search.roundId);
    })();
  }, []);

  return (
    <div className='flex flex-col w-screen h-screen overflow-hidden lg:flex-row'>
      <SidebarSection />
      <div className='flex flex-col-reverse flex-1 overflow-hidden lg:flex-col'>
        <StepsSection />
        <MainSectionLayout />
      </div>
      <Toaster />
      {import.meta.env.DEV && <IsAdminIndicator />}
    </div>
  );
}
