import { Pencil } from 'lucide-react';

interface EditPencilButtonProps {
  onClick: () => void;
  showLabel?: boolean;
  labelText?: string;
}

export function EditPencilButton({ onClick, showLabel = false, labelText = 'Subtitle' }: EditPencilButtonProps) {
  return (
    <div className='flex items-center gap-2 cursor-pointer' onClick={() => onClick()}>
      {showLabel && <span className='text-[#7D7D7D] text-sm font-medium'>{labelText}</span>}
      <Pencil size={14} className='stroke-[#7D7D7D] transition-all duration-300 ease-in-out hover:stroke-black' />
    </div>
  );
}
