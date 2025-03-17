import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { useUser } from '@/hooks/use-user';
import { useEffect, useState } from 'react';

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedCategoryId = useSidebarStore((state) => state.selectedCategoryId);
  const { isAdminModeEnabled: isAdmin } = useUser();
  const isMobile = useIsMobile();

  // This loading actually depends on category fetch loading
  // If there's not a selected category then there are no steps to show
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  useEffect(() => {
    if (selectedCategoryId) {
      stepsState.fetchByCategoryId(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  if (stepsState.error) {
    return <p>{stepsState.error}</p>;
  }

  const formattedSteps = stepsState.steps.map((step, position) => ({ ...step, position }));

  return (
    <>
      <StepsList
        selectedCategoryId={selectedCategoryId}
        isLoading={isLoading}
        steps={formattedSteps}
        selectedStep={formattedSteps.find((step) => step.id === stepsState.selectedStep?.id) ?? null}
        onSelectStep={stepsState.setSelectedStep}
        onDeleteStep={stepsState.deleteStep}
        onEditStep={stepsState.editStep}
        isAdmin={isAdmin}
      />
      {!isLoading && !isMobile && isAdmin && <AddStepModal categoryId={selectedCategoryId} onSave={stepsState.addStep} />}
    </>
  );
}
