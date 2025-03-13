import { Toaster } from '@/components/ui/toaster';
import { IS_DEVELOPMENT } from '@/config';
import { useRouterObserver } from '@/hooks/use-router-observer';
import { useIsMobile } from '@/hooks/use-tresholds';
import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSectionLayout } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';
import { cn } from '@/lib/utils';
import { useSidebarStore, useUserStore } from '@/state';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

const indexRouteSearchParamsSchema = z.object({
  roundId: z.number().min(1).optional(),
  categoryId: z.number().min(1).optional(),
  stepId: z.number().min(1).optional(),
});

export type IndexRouteSearchParams = z.infer<typeof indexRouteSearchParamsSchema>;

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: (search): IndexRouteSearchParams => {
    const parsed = indexRouteSearchParamsSchema.safeParse(search);
    return { roundId: parsed.data?.roundId, categoryId: parsed.data?.categoryId, stepId: parsed.data?.stepId };
  },
});

function Index() {
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
        <MainSectionLayout />
      </div>
      <Toaster />
      {IS_DEVELOPMENT && <IsAdminIndicator />}
    </div>
  );
}
