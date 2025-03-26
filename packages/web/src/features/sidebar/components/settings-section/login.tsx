import { SidebarListButton } from '../sidebar-list-button';
import googleLogo from '@/assets/google_logo.svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@/hooks/use-user';
import { signInWithRedirect } from 'aws-amplify/auth';
import { LoaderCircle, LogIn } from 'lucide-react';

export const Login = () => {
  const { isLoading } = useUser();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarListButton isDisabled={isLoading}>
          <div className='flex flex-row gap-2'>
            {isLoading ? (
              <span className='animate-spin'>
                <LoaderCircle className='!h-[20px] !w-[20px]' />
              </span>
            ) : (
              <LogIn className='h-[20px] w-[20px]' />
            )}
            <span className='text-sm'>Log in</span>
          </div>
        </SidebarListButton>
      </DialogTrigger>
      <DialogContent className='flex w-[600px] max-w-[95%] flex-col items-center rounded-[22px] p-16'>
        <DialogHeader className='flex w-full items-start justify-start gap-6'>
          <DialogTitle className='text-left text-2xl font-medium text-dark-low'>Log in</DialogTitle>
          <DialogDescription className='text-left text-xl text-dark-high'>
            Login with Google to access additional features.
          </DialogDescription>
        </DialogHeader>
        <div className='w-full pt-[110px]'>
          <Button
            className='w-full justify-center'
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
