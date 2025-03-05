import { useUserStore } from '@/state';
import { SettingsButton } from './settings-button';
// import Logout from './logout';
import { Login } from './login';
import Logout from './logout';

export function SettingsSection() {
  const user = useUserStore((state) => state.user);

  return (
    <ul className='flex flex-col gap-2'>
      <SettingsButton />
      {user?.authToken ? <Logout /> : <Login />}
    </ul>
  );
}
