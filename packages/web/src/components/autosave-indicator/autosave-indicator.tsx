import { AutoSaveStatus as AutosaveStatus } from '@/components/autosave-indicator/types';
import { AutosaveIcon } from '@/components/icons/autosave-icon';

interface AutoSaveIndicatorProps {
  status: AutosaveStatus;
}

const textMap = {
  [AutosaveStatus.SAVING]: 'Saving...',
  [AutosaveStatus.UNSAVED]: 'Unsaved changes',
  [AutosaveStatus.SAVED]: 'Saved',
  [AutosaveStatus.IDLE]: '',
};

export function AutoSaveIndicator({ status }: AutoSaveIndicatorProps) {
  return (
    <div className='flex items-center h-full gap-3'>
      <span className='text-[14px] text-[#9E9E9E]'>{textMap[status]}</span>
      <AutosaveIcon size={45} />
    </div>
  );
}
