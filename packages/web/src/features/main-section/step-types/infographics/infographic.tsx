import { AddInfographicModal } from './add-infographic-modal';
import { InfographicList } from './infographic-list';
import { useInfographicsStepContext } from '@/features/main-section/step-types/infographics/context/use-infographics-step-context';
import { withInfographicsStepContext } from '@/features/main-section/step-types/infographics/context/with-infographics-step-context';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';

function InfographicStepComponent() {
  const { step } = useInfographicsStepContext();
  const { isAdminModeEnabled: isAdmin } = useUser();

  return (
    <div
      className={cn('relative flex flex-col lg:pt-0', {
        'pt-20': isAdmin,
      })}
    >
      <div className='flex w-full flex-col items-center bg-white px-8 py-12 lg:gap-8 lg:rounded-3xl lg:px-16 lg:pb-16 lg:pt-7'>
        {isAdmin && <AddInfographicModal stepId={step.id} />}
        <InfographicList infographics={step.infographics} />
      </div>
    </div>
  );
}

export const InfographicStep = withInfographicsStepContext(InfographicStepComponent);
