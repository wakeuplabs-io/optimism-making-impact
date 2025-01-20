import AutosaveIcon from '@/components/icons/autosave-icon';

interface AutoSaveIndicatorProps {
  saving: boolean;
}

export function AutoSaveIndicator(props: AutoSaveIndicatorProps) {
  return (
    <div className='flex items-center h-full gap-4'>
      <span className='text-[#9E9E9E]'>{props.saving ? 'Saving...' : 'Autosaved'}</span>
      <AutosaveIcon />
    </div>
  );
}
