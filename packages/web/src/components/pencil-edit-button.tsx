import { Pencil } from 'lucide-react';

interface EditPencilButtonProps {
  onClick: () => void;
}

export function EditPencilButton(props: EditPencilButtonProps) {
  return (
    <Pencil
      size={14}
      onClick={() => props.onClick()}
      className='cursor-pointer stroke-[#7D7D7D] transition-all duration-300 ease-in-out hover:stroke-black'
    />
  );
}
