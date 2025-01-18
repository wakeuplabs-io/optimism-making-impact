import { ActionButton } from '@/components/action-button';
import { AddInfogrpahyButton } from '@/features/main-section/step-types/infographies/add-infogrpahy-modal';
import { InfographyCard } from '@/features/main-section/step-types/infographies/infography-card';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteStep } from '@/types';
import isEqual from 'lodash.isequal';
import { Save } from 'lucide-react';

interface InfogrpahyStepProps {
  step: CompleteStep;
}

export function InfographyStep(props: InfogrpahyStepProps) {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const deleteInfogrpahy = useMainSectionStore((state) => state.deleteInfogrpahy);
  const addInfography = useMainSectionStore((state) => state.addInfography);
  const bulkEditInfogrpahies = useMainSectionStore((state) => state.bulkEditInfogrpahies);
  const editInfogrpahy = useMainSectionStore((state) => state.editInfogrpahy);
  const step = useMainSectionStore((state) => state.step);
  const stepInitialState = useMainSectionStore((state) => state.stepInitialState);

  return (
    <div className='flex w-full max-w-[1000px] flex-col gap-4'>
      {isAdmin && (
        <div className='flex w-full justify-end gap-2'>
          <ActionButton
            label='Save'
            icon={<Save />}
            disabled={isEqual(step, stepInitialState)}
            onClick={() => bulkEditInfogrpahies(props.step.infographies)}
          />
          <AddInfogrpahyButton onClick={addInfography} stepId={props.step.id} />
        </div>
      )}
      {props.step.infographies.map((infography, order) => {
        return (
          <InfographyCard
            infography={infography}
            order={order}
            key={`${infography.id}-${order}`}
            isAdmin={isAdmin}
            onDelete={deleteInfogrpahy}
            onChangeText={(infographyId, markdown) => editInfogrpahy(infographyId, { markdown })}
            onEditImage={(infographyId, image) => editInfogrpahy(infographyId, { image })}
          />
        );
      })}
    </div>
  );
}
