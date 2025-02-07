import { signOut } from 'aws-amplify/auth';
import { AuthButton } from './auth-button';
import { LogOut } from 'lucide-react';

export const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return <AuthButton onClick={handleLogout} label='Logout' icon={LogOut} />;
};

export default Logout;
