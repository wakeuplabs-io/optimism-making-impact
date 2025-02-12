import { InfographyList } from '@/features/main-section/step-types/infographies/infography-list';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { InfographyActionBar } from './infography-action-bar';
import { AddInfogrpahyButton } from './add-infogrpahy-modal';
import { cn } from '@/lib/utils';

export function InfographyStep() {
  const { step, addInfography } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  if (!step) {
    return (
      <div className='flex items-center justify-center w-full h-full gap-4'>
        <span>Select a step</span>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col px-8 bg-white lg:pt-7 lg:pb-16 lg:rounded-3xl xl:px-32'>
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
    </div>
  );
}
