import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useSidebarStore, useUserStore } from '@/state';
import { useStepsStore } from '@/state/steps/steps-store';
import { useEffect } from 'react';

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedCategoryId = useSidebarStore((state) => state.selectedCategoryId);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const isMobile = useIsMobile();

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

  const formattedSteps = stepsState.steps.map((step, position) => ({ ...step, position }));

  return (
    <div className='flex items-center justify-between flex-1 max-w-full gap-4 px-8 pt-4 pb-12 overflow-hidden lg:items-start lg:px-0 lg:pb-10 lg:pt-16'>
      <StepsList
        steps={formattedSteps}
        selectedStep={formattedSteps.find((step) => step.id === stepsState.selectedStep?.id) ?? null}
        onSelectStep={stepsState.setSelectedStep}
        onDeleteStep={stepsState.deleteStep}
        onEditStep={stepsState.editStep}
        isAdmin={isAdmin}
      />
      {!isMobile && isAdmin && <AddStepModal categoryId={selectedCategoryId} onSave={stepsState.addStep} />}
    </div>
  );
}
