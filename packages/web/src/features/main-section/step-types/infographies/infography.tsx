import { AutoSaveIndicator } from '@/components/auto-save-indicator';
import { IconButton } from '@/components/icon-button';
import { AUTOSAVE_INTERVAL } from '@/config';
import { AddInfogrpahyButton } from '@/features/main-section/step-types/infographies/add-infogrpahy-modal';
import { InfographyCard } from '@/features/main-section/step-types/infographies/infography-card';
import { useUserStore } from '@/state';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import isEqual from 'lodash.isequal';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

export function InfographyStep() {
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
    () => {
      if (step) saveInfogrpahies(step.infographies);
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? AUTOSAVE_INTERVAL : null,
  );

  if (!step) {
    return (
      <div className='flex items-center justify-center w-full h-full gap-4'>
        <span>Select a step</span>
      </div>
    );
  }

  return (
    <div className='flex w-full max-w-[1000px] flex-col gap-4'>
      {isAdmin && (
        <div className='flex justify-end w-full gap-2'>
          <AutoSaveIndicator saving={saving} pending={!isStateUnchanged} />
          <IconButton icon={<Save />} disabled={isStateUnchanged} onClick={() => saveInfogrpahies(step.infographies)} />
          <AddInfogrpahyButton onClick={addInfography} stepId={step.id} />
        </div>
      )}
      {step.infographies.map((infography, order) => {
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
