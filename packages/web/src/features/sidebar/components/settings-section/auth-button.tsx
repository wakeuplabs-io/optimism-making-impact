import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon, LoaderCircle } from 'lucide-react';
import { forwardRef } from 'react';

type AuthButtonProps = {
  icon: LucideIcon;
  variant?: 'regular' | 'dark';
  label?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

export const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ isLoading = false, icon: Icon, variant = 'regular', label, onClick, className }, ref) => {
    return (
      <Button
        className={cn(className, {
          'rounded-xl justify-start': !isLoading,
          'rounded-xl justify-center': !label,
          'opacity-50 cursor-not-allowed justify-center': isLoading,
        })}
        variant={variant === 'dark' ? 'gray' : 'gray-light'}
        size={label ? 'xl' : 'icon-xl'}
        onClick={onClick}
        ref={ref}
      >
        {/* TODO: check why the icon size cannot be modified */}
        {isLoading ? (
          <span className='animate-spin'>
            <LoaderCircle className='!h-6 !w-6' />
          </span>
        ) : (
          <>
            <Icon className='!h-6 !w-6' strokeWidth={2} />
            {label}
          </>
        )}
      </Button>
    );
  },
);
