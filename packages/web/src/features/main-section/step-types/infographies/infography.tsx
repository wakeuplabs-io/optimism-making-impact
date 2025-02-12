import { InfographyList } from '@/features/main-section/step-types/infographies/infography-list';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { InfographyActionBar } from './infography-action-bar';

export function InfographyStep() {
  const { step } = useMainSectionStore((state) => state);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  if (!step) {
    return (
      <div className='flex items-center justify-center w-full h-full gap-4'>
        <span>Select a step</span>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col gap-y-20 py-12 px-8 bg-white lg:rounded-3xl lg:gap-4 xl:px-32 lg:py-24'>
      {isAdmin && <InfographyActionBar />}
      <InfographyList infographies={step.infographies} />
    </div>
  );
}
