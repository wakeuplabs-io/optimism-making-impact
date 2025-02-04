import { cn } from '@/lib/utils';

export interface SidebarActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SidebarActionButton({ label, icon, className, ...props }: SidebarActionButtonProps) {
  return (
    <button
      className={cn(
        'flex h-[24px] w-fit flex-row items-center justify-center rounded-[8px] bg-[#10111A] px-3 text-[12px] text-white transition-all duration-500 ease-in-out hover:opacity-80',
        className,
        {
          'bg-gray-400 hover:opacity-100': props.disabled,
        },
      )}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
}
