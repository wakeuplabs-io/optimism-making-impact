import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
import { useStepsStore } from '@/state/steps/steps-store';
import { useUserStore } from '@/state/user-store/user-store';
import { useEffect, useState } from 'react';

export function StepsSectionContent() {
  const stepsState = useStepsStore((state) => state);
  const selectedCategoryId = useSidebarStore((state) => state.selectedCategoryId);
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
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
    <div className='flex max-w-full flex-1 items-center justify-center gap-4 overflow-hidden px-8 pb-4 pt-4 lg:h-[145px] lg:items-start lg:px-0 lg:pb-10 lg:pt-16'>
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
    </div>
  );
}
