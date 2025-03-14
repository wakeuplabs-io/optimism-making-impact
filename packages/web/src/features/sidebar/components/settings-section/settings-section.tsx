import { Login } from './login';
import Logout from './logout';
import { SettingsButton } from './settings-button';
import { useUserStore } from '@/state/user-store/user-store';

export function SettingsSection() {
  const user = useUserStore((state) => state.user);

  return (
    <ul className='flex flex-col gap-2'>
      {user?.authToken ? (
        <>
          <SettingsButton />
          <Logout />
        </>
      ) : (
        <Login />
      )}
    </ul>
  );
}
