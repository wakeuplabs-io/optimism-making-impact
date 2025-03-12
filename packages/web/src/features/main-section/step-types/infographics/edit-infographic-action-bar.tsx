import { cn } from '@/lib/utils';
import { Check, LucideIcon, X } from 'lucide-react';

interface EditInfographicActionBarProps {
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export function EditInfographicActionBar({ isSubmitDisabled, onSubmit, onCancel }: EditInfographicActionBarProps) {
  return (
    <div className='flex gap-2'>
      <EditInfographicActionBarButton icon={Check} onClick={onSubmit} disabled={isSubmitDisabled} className='bg-mi-lime-400' />
      <EditInfographicActionBarButton icon={X} onClick={onCancel} className='bg-mi-red-400' />
    </div>
  );
}

interface EditInfographicActionBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
}

function EditInfographicActionBarButton({ icon: Icon, onClick, className, ...props }: EditInfographicActionBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn('w-[24px] h-[24px] rounded-full flex items-center justify-center p-1 disabled:bg-gray-300', className)}
      {...props}
    >
      <Icon className='h-full w-full text-white' strokeWidth={3} />
    </button>
  );
}
