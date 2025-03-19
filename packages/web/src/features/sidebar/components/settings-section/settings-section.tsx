import { Login } from './login';
import Logout from './logout';
import { SettingsButton } from './settings-button';
import { useUser } from '@/hooks/use-user';

export function SettingsSection() {
  const { user } = useUser();

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
