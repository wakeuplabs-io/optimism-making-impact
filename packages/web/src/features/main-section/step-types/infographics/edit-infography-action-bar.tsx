import { cn } from '@/lib/utils';
import { Check, LucideIcon, X } from 'lucide-react';

export function EditInfographyActionBar() {
  return (
    <div className='flex gap-2'>
      <EditInfographyActionBarButton className='bg-mi-lime-400' icon={Check} onClick={() => {}} />
      <EditInfographyActionBarButton className='bg-mi-red-400' icon={X} onClick={() => {}} />
    </div>
  );
}

interface EditInfographyActionBarButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
}

function EditInfographyActionBarButton({ icon: Icon, onClick, className }: EditInfographyActionBarButtonProps) {
  return (
    <button onClick={onClick} className={cn('w-[24px] h-[24px] rounded-full flex items-center justify-center p-1', className)}>
      <Icon className='h-full w-full text-white' strokeWidth={3} />
    </button>
  );
}
