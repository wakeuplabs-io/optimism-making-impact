import { InfographicActionBar } from './infographic-action-bar';
import { InfographicList } from '@/features/main-section/step-types/infographics/infographic-list';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { ReactNode } from 'react';

function InfographicStepWrapper({ children }: { children: ReactNode }) {
  return <div className='flex w-full flex-col bg-white px-8 py-12 lg:rounded-3xl lg:px-16 lg:pb-16 lg:pt-7'>{children}</div>;
}

export function InfographicStep() {
  const { step } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const isMobile = useIsMobile();

  if (!step) {
    return (
      <div className='flex h-full w-full items-center justify-center gap-4'>
        <span>Select a step</span>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className='flex flex-col gap-6'>
        {isAdmin && <InfographicActionBar />}
        <InfographicStepWrapper>
          <div className='flex w-full flex-col gap-y-16'>
            <InfographicList infographics={step.infographics} />
          </div>
        </InfographicStepWrapper>
      </div>
    );
  }

  return (
    <InfographicStepWrapper>
      {isAdmin && <InfographicActionBar className='lg:mb-7' />}
      <div className='flex w-full flex-col gap-y-16'>
        <InfographicList infographics={step.infographics} />
      </div>
    </InfographicStepWrapper>
  );
}
