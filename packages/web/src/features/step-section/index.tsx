import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { useCategories } from '@/hooks/use-categories';
import { useStepsList } from '@/hooks/use-steps-list';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUser } from '@/hooks/use-user';

export function StepsSectionContent() {
  const { isAdminModeEnabled: isAdmin } = useUser();

  const isMobile = useIsMobile();
  const { steps, selectedStep, isLoading, error, handleStepSelect, handleStepDelete, handleStepEdit, handleStepAdd } = useStepsList();
  const { selectedCategory } = useCategories();

  const showAddStepButton = !isLoading && !isMobile && isAdmin && selectedCategory;

  return (
    <>
      <StepsList
        steps={steps}
        selectedStep={selectedStep}
        selectedCategoryId={selectedCategory?.id}
        isLoading={isLoading}
        isAdmin={isAdmin}
        error={error}
        onStepSelect={handleStepSelect}
        onStepDelete={handleStepDelete}
        onStepEdit={handleStepEdit}
      />

      {showAddStepButton && <AddStepModal categoryId={selectedCategory.id} onSave={handleStepAdd} />}
    </>
  );
}
