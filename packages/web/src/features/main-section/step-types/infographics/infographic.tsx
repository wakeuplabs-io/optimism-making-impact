import { AddInfographicModal } from './add-infographic-modal';
import { InfographicList } from './infographic-list';
import { cn } from '@/lib/utils';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { useUserStore } from '@/state/user-store/user-store';
import { ReactNode } from 'react';

function InfographicStepWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='flex w-full flex-col items-center bg-white px-8 py-12 lg:gap-8 lg:rounded-3xl lg:px-16 lg:pb-16 lg:pt-7'>
      {children}
    </div>
  );
}

export function InfographicStep() {
  const { step } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  if (!step) {
    return (
      <div className='flex h-full w-full items-center justify-center gap-4'>
        <span>Select a step</span>
      </div>
    );
  }

  return (
    <div
      className={cn('relative flex flex-col lg:pt-0', {
        'pt-20': isAdmin,
      })}
    >
      <InfographicStepWrapper>
        {isAdmin && <AddInfographicModal stepId={step.id} />}
        <InfographicList infographics={step.infographics} />
      </InfographicStepWrapper>
    </div>
  );
}
