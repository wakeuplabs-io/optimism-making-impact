import { Plus } from 'lucide-react';

export function AddStepButton(props: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className='flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#14141A] transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-primary'
      {...props}
    >
      <Plus className='text-white' />
    </button>
  );
}
