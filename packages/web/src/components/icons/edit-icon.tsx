import { LucideProps, Pencil } from 'lucide-react';

export function EditIcon(props: Omit<LucideProps, 'ref'>) {
  return <Pencil size={14} className='stroke-[#4E4E4E] hover:cursor-pointer hover:stroke-black' {...props} />;
}
