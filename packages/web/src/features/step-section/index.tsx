import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { useCategoryList } from '@/hooks/use-category-list';
import { useStepsList } from '@/hooks/use-steps-list';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUserStore } from '@/state/user-store/user-store';

export function StepsSectionContent() {
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const isMobile = useIsMobile();
  const { steps, selectedStep, isLoading, error, handleStepSelect, handleStepDelete, handleStepEdit, handleStepAdd } = useStepsList();
  const { selectedCategory } = useCategoryList();

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
