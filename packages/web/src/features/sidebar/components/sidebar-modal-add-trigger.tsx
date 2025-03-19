import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

export interface SidebarModalAddTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function SidebarModalAddTrigger({ label, ...props }: SidebarModalAddTriggerProps) {
  return (
    <button
      className={cn(`flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-dark-high duration-200 hover:bg-mi-stone-300`)}
      {...props}
    >
      <Plus className='h-[20px] w-[20px]' strokeWidth={2} />
      <span className='truncate text-sm'>{label}</span>
    </button>
  );
}
