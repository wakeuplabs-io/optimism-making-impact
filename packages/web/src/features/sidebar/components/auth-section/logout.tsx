import { signOut } from 'aws-amplify/auth';
import { AuthButton } from './auth-button';
import { LogOut } from 'lucide-react';
import { useUserStore } from '@/state';

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
    <AuthButton onClick={handleLogout} icon={LogOut} variant='dark' />
  ) : (
    <AuthButton onClick={handleLogout} label='Logout' icon={LogOut} />
  );
};

export default Logout;
