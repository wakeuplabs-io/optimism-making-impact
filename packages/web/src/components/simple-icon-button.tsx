import { cn } from '@/lib/utils';

interface SimpleIconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export function SimpleIconButton({ icon, className, ...props }: SimpleIconButton) {
  return (
    <button
      className={cn(
        'flex h-[45px] w-[45px] items-center justify-center text-[#7A879A] transition-all duration-500 ease-in-out hover:text-gray-500 hover:cursor-pointer disabled:cursor-default disabled:text-gray-400 disabled:hover:opacity-100',
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
