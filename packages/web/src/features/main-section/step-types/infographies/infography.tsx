import { AddInfogrpahyButton } from '@/features/main-section/step-types/infographies/add-infogrpahy-button';
import { InfographyCard } from '@/features/main-section/step-types/infographies/infography-card';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteStep } from '@/types';

interface InfogrpahyStepProps {
  step: CompleteStep;
}

export function InfographyStep(props: InfogrpahyStepProps) {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const deleteInfogrpahy = useMainSectionStore((state) => state.deleteInfogrpahy);
  const addInfography = useMainSectionStore((state) => state.addInfography);

  return (
    <div className='flex w-full max-w-[1000px] flex-col gap-4'>
      {props.step.infographies.map((infography, order) => {
        return (
          <InfographyCard
            infography={infography}
            order={order}
            key={`${infography.id}-${order}`}
            isAdmin={isAdmin}
            onDelete={deleteInfogrpahy}
          />
        );
      })}
      {isAdmin && <AddInfogrpahyButton onClick={addInfography} stepId={props.step.id} />}
    </div>
  );
}
