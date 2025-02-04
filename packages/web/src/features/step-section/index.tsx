import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { useSidebarStore, useUserStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { useEffect } from 'react';

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedRound = useSidebarStore((state) => state.selectedRound);
  const isAdmin = useUserStore((state) => state.isAdmin);

  useEffect(() => {
    if (selectedRound) {
      stepsState.fetchByRoundId(selectedRound.id);
    }
  }, [selectedRound]);

  if (!selectedRound) {
    return <p>Select a round to see the steps</p>;
  }

  if (stepsState.error) {
    return <p>{stepsState.error}</p>;
  }

  return (
    <div className='flex max-w-full flex-1 items-center justify-between gap-4 overflow-hidden'>
      <StepsList
        steps={stepsState.steps}
        selectedStep={stepsState.selectedStep}
        onSelectStep={stepsState.setSelectedStep}
        onDeleteStep={stepsState.deleteStep}
        onEditStep={stepsState.editStep}
        isAdmin={isAdmin}
      />
      {isAdmin && <AddStepModal roundId={selectedRound.id} onClick={stepsState.addStep} />}
    </div>
  );
}
