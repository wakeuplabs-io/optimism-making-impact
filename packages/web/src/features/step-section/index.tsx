import { AddStepModal } from '@/features/step-section/add-step-modal';
import { StepsList } from '@/features/step-section/step-list';
import { useCategoryList } from '@/hooks/use-category-list';
import { useStepsList } from '@/hooks/use-steps-list';
import { useIsMobile } from '@/hooks/use-tresholds';
import { useUserStore } from '@/state/user-store/user-store';

export function StepsSectionContent() {
  const isAdmin = useUserStore((state) => state.isAdminModeEnabled);
  const isMobile = useIsMobile();

  const { isLoading, handleStepAdd } = useStepsList();
  const { selectedCategory } = useCategoryList();

  return (
    <>
      <StepsList isAdmin={isAdmin} />
      {!isLoading && !isMobile && isAdmin && selectedCategory && <AddStepModal categoryId={selectedCategory?.id} onSave={handleStepAdd} />}
    </>
  );
}
