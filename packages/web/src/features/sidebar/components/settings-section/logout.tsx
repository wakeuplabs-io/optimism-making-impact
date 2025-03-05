import { AuthButton } from './auth-button';
import { ViewModeToggle } from './view-mode-toggle';
import { useUserStore } from '@/state';
import { LogOut } from 'lucide-react';

export const Logout = () => {
  const { user, signOut } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return user?.isAdmin ? (
    <div className='flex gap-2'>
      <AuthButton onClick={handleLogout} icon={LogOut} variant='dark' />
      <ViewModeToggle />
    </div>
  ) : (
    <AuthButton onClick={handleLogout} label='Logout' icon={LogOut} />
  );
};

export default Logout;
