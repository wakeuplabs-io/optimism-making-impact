import { cn } from '@/lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function IconButton({ icon, variant = 'primary', ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        'flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#14141A] text-white transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-primary',
        {
          'bg-primary': variant === 'primary',
          'bg-[#10111A]': variant === 'secondary',
          'bg-gray-400 hover:opacity-100': props.disabled,
        },
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
