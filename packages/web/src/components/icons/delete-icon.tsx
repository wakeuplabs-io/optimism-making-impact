import { LucideProps, X } from 'lucide-react';

export function DeleteIcon(props: Omit<LucideProps, 'ref'>) {
  return <X size={14} className='stroke-[#4E4E4E] hover:cursor-pointer hover:stroke-black' {...props} />;
}
