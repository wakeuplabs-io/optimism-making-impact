import { ReactNode } from 'react';
import { InfographyList } from '@/features/main-section/step-types/infographies/infography-list';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { InfographyActionBar } from './infography-action-bar';
import { AddInfogrpahyButton } from './add-infogrpahy-modal';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-tresholds';

function InfographyStepWrapper({ children }: { children: ReactNode }) {
  return <div className='flex w-full flex-col px-8 py-12 bg-white lg:pt-7 lg:pb-16 lg:rounded-3xl xl:px-32'>{children}</div>;
}

export function InfographyStep() {
  const { step, addInfography } = useMainSectionStore((state) => state);
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
        <div
          className={cn('flex gap-2', {
            invisible: !isAdmin,
          })}
        >
          <InfographyActionBar />
          <AddInfogrpahyButton onClick={addInfography} stepId={step.id} />
        </div>
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
      <AddInfogrpahyButton
        onClick={addInfography}
        stepId={step.id}
        className={cn('w-full lg:mt-16', {
          invisible: !isAdmin,
        })}
      />
    </InfographyStepWrapper>
  );
}
