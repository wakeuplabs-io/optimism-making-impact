import { SidebarListButton } from '../sidebar-list-button';
import { useUser } from '@/hooks/use-user';
import { LogOut } from 'lucide-react';

export const Logout = () => {
  const { signOut } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SidebarListButton onClick={handleLogout}>
      <div className='flex flex-row gap-2'>
        <LogOut className='h-[20px] w-[20px]' />
        <span className='text-sm'>Log out</span>
      </div>
    </SidebarListButton>
  );
};

export default Logout;
