import { AddInfographicModal } from './add-infogrpahy-modal';
import { AutoSaveIndicator } from '@/components/autosave-indicator/autosave-indicator';
import { IconButton } from '@/components/icon-button';
import { AUTOSAVE_INTERVAL } from '@/config';
import { cn } from '@/lib/utils';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import isEqual from 'lodash.isequal';
import { Save } from 'lucide-react';
import { useMemo } from 'react';
import { useInterval } from 'usehooks-ts';

interface InfographicActionBarProps {
  className?: string;
}

export const InfographicActionBar: React.FC<InfographicActionBarProps> = ({ className }) => {
  const { step, stepInitialState, addInfographic, saveInfographics, savingStatus } = useMainSectionStore((state) => state);

  const isStateEqual = useMemo(() => isEqual(step, stepInitialState), [step, stepInitialState]);

  useInterval(
    async () => {
      if (step) saveInfographics(step.infographics);
    },
    !isStateEqual ? AUTOSAVE_INTERVAL : null,
  );

  if (!step) return null;

  return (
    <div className={cn('flex w-full justify-end gap-2', className)}>
      <AutoSaveIndicator status={savingStatus} />
      <IconButton icon={<Save />} disabled={isStateEqual} onClick={() => saveInfographics(step.infographics)} />
      <AddInfographicModal onClick={addInfographic} stepId={step.id} />
    </div>
  );
};
