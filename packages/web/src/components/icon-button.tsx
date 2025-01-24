import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function IconButton({ icon, variant = 'primary', className, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        'flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#14141A] text-white transition-all duration-500 ease-in-out hover:cursor-pointer disabled:cursor-default disabled:bg-gray-400 disabled:hover:opacity-100',
        {
          'bg-primary hover:opacity-80': variant === 'primary',
          'bg-[#10111A] hover:opacity-80': variant === 'secondary',
        },
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
