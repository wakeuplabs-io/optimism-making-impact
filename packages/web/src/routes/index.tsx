import { Toaster } from '@/components/ui/toaster';
import { IsAdminIndicator } from '@/layout/sections/is-admin-indicator';
import { MainSection } from '@/layout/sections/main';
import { SidebarSection } from '@/layout/sections/sidebar';
import { StepsSection } from '@/layout/sections/steps';
import { useSidebarStore } from '@/state';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const mainSchema = z.object({
  roundId: z.number().min(1).optional(),
});

type MainSearchParams = z.infer<typeof mainSchema>;

export const Route = createFileRoute('/')({
  component: Main,
  validateSearch: (search: Record<string, unknown>): MainSearchParams => {
    const parsed = mainSchema.safeParse(search);
    return { roundId: parsed.data?.roundId };
  },
  onEnter: async ({ search }) => {
    await useSidebarStore.getState().fetchData();
    if (search.roundId) {
      useSidebarStore.getState().setSelectedRound(search.roundId);
    }
  },
});

function Main() {
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
