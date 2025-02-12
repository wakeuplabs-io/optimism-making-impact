import { ReactNode } from 'react';
import { InfographyList } from '@/features/main-section/step-types/infographies/infography-list';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { InfographyActionBar } from './infography-action-bar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-tresholds';

function InfographyStepWrapper({ children }: { children: ReactNode }) {
  return <div className='flex w-full flex-col px-8 py-12 bg-white lg:pt-7 lg:pb-16 lg:rounded-3xl lg:px-16'>{children}</div>;
}

export function InfographyStep() {
  const { step } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const isMobile = useIsMobile();

  if (!step) {
    return (
      <div className='flex items-center justify-center w-full h-full gap-4'>
        <span>Select a step</span>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className='flex flex-col gap-6'>
        <InfographyActionBar className={cn({ hidden: !isAdmin })} />
        <InfographyStepWrapper>
          <div className='flex w-full flex-col gap-y-16'>
            <InfographyList infographies={step.infographies} />
          </div>
        </InfographyStepWrapper>
      </div>
    );
  }

  return (
    <InfographyStepWrapper>
      <InfographyActionBar
        className={cn('lg:mb-7', {
          invisible: !isAdmin,
        })}
      />
      <div className='flex w-full flex-col gap-y-16'>
        <InfographyList infographies={step.infographies} />
      </div>
    </InfographyStepWrapper>
  );
}
