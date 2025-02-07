import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon, LoaderCircle } from 'lucide-react';
import { forwardRef } from 'react';

type AuthButtonProps = {
  label: React.ReactNode;
  icon: LucideIcon;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};

export const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ isLoading = false, icon: Icon, label, onClick, className }, ref) => {
    return (
      <Button
        className={cn(className, 'rounded-xl', {
          'justify-start': !isLoading,
          'opacity-50 cursor-not-allowed justify-center': isLoading,
        })}
        variant='gray'
        size='xl'
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
            <Icon className='!h-6 !w-6' />
            {label}
          </>
        )}
      </Button>
    );
  },
);
