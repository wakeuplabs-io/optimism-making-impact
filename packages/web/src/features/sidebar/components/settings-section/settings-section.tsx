import { useUserStore } from '@/state';
import { SettingsButton } from './settings-button';
// import Logout from './logout';
import { Login } from './login';

export function SettingsSection() {
  const user = useUserStore((state) => state.user);

  return (
    <ul className='flex flex-col gap-2'>
      <SettingsButton />
      {user?.authToken ? null : <Login />}
    </ul>
  );
}
