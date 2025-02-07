import { signOut } from 'aws-amplify/auth';
import { AuthButton } from './auth-button';
import { LogOut } from 'lucide-react';
import { useUserStore } from '@/state';
import { ViewModeToggle } from './view-mode-toggle';

export const Logout = () => {
  const { user } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return user.isAdmin ? (
    <div className='flex gap-2'>
      <AuthButton onClick={handleLogout} icon={LogOut} variant='dark' />
      <ViewModeToggle />
    </div>
  ) : (
    <AuthButton onClick={handleLogout} label='Logout' icon={LogOut} />
  );
};

export default Logout;
