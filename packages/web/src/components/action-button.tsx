import { cn } from '@/lib/utils';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function ActionButton({ label, icon, variant = 'primary', className, ...props }: ActionButtonProps) {
  return (
    <button
      className={cn(
        'flex h-[46px] w-fit min-w-40 flex-row items-center justify-center gap-2 rounded-full bg-primary px-3 transition-all duration-500 ease-in-out hover:opacity-80',
        className,
        {
          'bg-primary': variant === 'primary',
          'bg-[#10111A]': variant === 'secondary',
          'bg-gray-400 hover:opacity-100': props.disabled,
        },
      )}
      {...props}
    >
      {icon && <div className='text-white-high'>{icon}</div>}
      <div className='text-lg font-normal text-white-high 2xl:text-xl'>{label}</div>
    </button>
  );
}
