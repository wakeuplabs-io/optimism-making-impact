import { Save } from 'lucide-react';
import { useMemo } from 'react';
import isEqual from 'lodash.isequal';
import { useInterval } from 'usehooks-ts';
import { IconButton } from '@/components/icon-button';
import { useMainSectionStore } from '@/state/main-section/main-section-store';
import { AutoSaveIndicator } from '@/components/autosave-indicator/autosave-indicator';
import { AUTOSAVE_INTERVAL } from '@/config';
import { cn } from '@/lib/utils';

interface InfographyActionBarProps {
  className?: string;
}

export const InfographyActionBar: React.FC<InfographyActionBarProps> = ({ className }) => {
  const { step, stepInitialState, saveInfographies, savingStatus } = useMainSectionStore((state) => state);

  const isStateEqual = useMemo(() => isEqual(step, stepInitialState), [step, stepInitialState]);

  useInterval(
    async () => {
      if (step) saveInfographies(step.infographies);
    },
    !isStateEqual ? AUTOSAVE_INTERVAL : null,
  );

  if (!step) return null;

  return (
    <div className={cn(className, 'flex justify-end w-full gap-2')}>
      <AutoSaveIndicator status={savingStatus} />
      <IconButton icon={<Save />} disabled={isStateEqual} onClick={() => saveInfographies(step.infographies)} />
    </div>
  );
};
