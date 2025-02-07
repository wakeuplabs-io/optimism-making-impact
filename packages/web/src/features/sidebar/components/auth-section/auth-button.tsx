import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon, LoaderCircle } from 'lucide-react';
import { FC } from 'react';

type AuthButtonProps = {
  className?: string;
  isLoading?: boolean;
  label: React.ReactNode;
  icon: LucideIcon;
};

export const AuthButton: FC<AuthButtonProps> = ({ isLoading = false, icon: Icon, label, className }) => {
  console.log(isLoading);

  return (
    <Button
      className={cn(className, 'rounded-xl', {
        'justify-start': !isLoading,
        'opacity-50 cursor-not-allowed justify-center': isLoading,
      })}
      variant='gray'
      size='xl'
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
};
