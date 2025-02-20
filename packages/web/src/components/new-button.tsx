import { Plus } from 'lucide-react';

interface NewButtonProps {
  label: string;
}

export function NewButton({ label }: NewButtonProps) {
  return (
    <>
      <button
        className='group flex w-full items-center gap-2 rounded-[10px] px-4 py-2 text-secondary shadow-none hover:bg-[#F1F4F9] hover:text-dark-high'
        onClick={() => {}}
      >
        <Plus size={16} className='text-secondary' />
        <span className='truncate text-[16px] leading-5'>{label}</span>
      </button>
    </>
  );
}
