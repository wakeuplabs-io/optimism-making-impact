import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { cn } from '@/lib/utils';
import { useSidebarStore, useUserStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { useEffect } from 'react';

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedCategoryId = useSidebarStore((state) => state.selectedCategoryId);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);

  useEffect(() => {
    if (selectedCategoryId) {
      stepsState.fetchByCategoryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  if (!selectedCategoryId) {
    return <p>Select a category to see the steps</p>;
  }

  if (stepsState.error) {
    return <p>{stepsState.error}</p>;
  }

  return (
    <div className='flex items-center justify-between flex-1 max-w-full gap-4 overflow-hidden'>
      <StepsList
        steps={stepsState.steps}
        selectedStep={stepsState.selectedStep}
        onSelectStep={stepsState.setSelectedStep}
        onDeleteStep={stepsState.deleteStep}
        onEditStep={stepsState.editStep}
        isAdmin={isAdmin}
      />
      <div
        className={cn({
          invisible: !isAdmin,
        })}
      >
        <AddStepModal categoryId={selectedCategoryId} onClick={stepsState.addStep} />
      </div>
    </div>
  );
}
