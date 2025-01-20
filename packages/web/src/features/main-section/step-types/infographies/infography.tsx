import { ActionButton } from '@/components/action-button';
import { AutoSaveIndicator } from '@/components/auto-save-indicator';
import { AUTOSAVE_INTERVAL } from '@/config';
import { AddInfogrpahyButton } from '@/features/main-section/step-types/infographies/add-infogrpahy-modal';
import { InfographyCard } from '@/features/main-section/step-types/infographies/infography-card';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { CompleteStep } from '@/types';
import isEqual from 'lodash.isequal';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

interface InfogrpahyStepProps {
  step: CompleteStep;
}

export function InfographyStep(props: InfogrpahyStepProps) {
  const isAdmin = useUserStore((state) => state.isAdmin);
  const { deleteInfogrpahy, addInfography, saveInfogrpahies, editInfogrpahy, step, stepInitialState, saving } = useMainSectionStore(
    (state) => state,
  );
  const isStateUnchanged = isEqual(step, stepInitialState);

  const [isPlaying, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isStateUnchanged) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [isStateUnchanged]);

  useInterval(
    () => saveInfogrpahies(props.step.infographies),
    // Delay in milliseconds or null to stop it
    isPlaying ? AUTOSAVE_INTERVAL : null,
  );

  return (
    <div className='flex w-full max-w-[1000px] flex-col gap-4'>
      {isAdmin && (
        <div className='flex justify-end w-full gap-2'>
          <AutoSaveIndicator saving={saving} pending={!isStateUnchanged} />
          <ActionButton
            label='Save'
            icon={<Save />}
            disabled={isStateUnchanged}
            onClick={() => saveInfogrpahies(props.step.infographies)}
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
            onChangeImage={(infographyId, image) => editInfogrpahy(infographyId, { image })}
          />
        );
      })}
    </div>
  );
}
