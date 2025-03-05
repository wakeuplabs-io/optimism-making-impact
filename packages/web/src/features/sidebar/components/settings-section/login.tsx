import { LoaderCircle, LogIn } from 'lucide-react';
import { useUserStore } from '@/state';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import googleLogo from '@/assets/google_logo.svg';
import { signInWithRedirect } from 'aws-amplify/auth';
import { SidebarListButton } from '../sidebar-list-button';

export const Login = () => {
  const isLoading = useUserStore((state) => state.isLoading);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarListButton isDisabled={isLoading}>
          {isLoading ? (
            <span className='animate-spin'>
              <LoaderCircle className='!h-[20px] !w-[20px]' />
            </span>
          ) : (
            <span>
              <LogIn className='h-[20px] w-[20px]' />
            </span>
          )}
          <span>Login</span>
        </SidebarListButton>
      </DialogTrigger>
      <DialogContent className='flex w-[600px] max-w-[95%] flex-col items-center rounded-[22px] p-16'>
        <DialogHeader className='flex items-start justify-start w-full gap-6'>
          <DialogTitle className='text-2xl text-left text-dark-low font-medium'>Login</DialogTitle>
          <DialogDescription className='text-xl text-left text-dark-high'>
            Login with Google to access additional features.
          </DialogDescription>
        </DialogHeader>
        <div className='w-full pt-[110px]'>
          <Button
            className='justify-center w-full'
            variant='gray-light'
            size='xl'
            onClick={() => signInWithRedirect({ provider: 'Google' })}
          >
            <img src={googleLogo} />
            <span>Continue with Google</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
