import { AutosaveIcon } from '@/components/icons/autosave-icon';

interface AutoSaveIndicatorProps {
  saving: boolean;
  pending: boolean;
}

export function AutoSaveIndicator(props: AutoSaveIndicatorProps) {
  // TODO: cuando se guarda que aparezca por un segundo autosaved y despues desaparezca (2 segundos)
  const text = props.saving ? 'Saving...' : props.pending ? 'Unsaved' : '';

  return (
    <div className='flex items-center h-full gap-3'>
      <span className='text-[14px] text-[#9E9E9E]'>{text}</span>
      <AutosaveIcon size={45} />
    </div>
  );
}
