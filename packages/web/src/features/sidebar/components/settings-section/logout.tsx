import { SidebarListButton } from '../sidebar-list-button';
import { useUserStore } from '@/state/user-store/user-store';
import { LogOut } from 'lucide-react';

export const Logout = () => {
  const signOut = useUserStore((state) => state.signOut);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SidebarListButton onClick={handleLogout}>
      <LogOut className='h-[20px] w-[20px]' />
      <span className='text-sm'>Log out</span>
    </SidebarListButton>
  );
};

export default Logout;
