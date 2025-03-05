import { AuthSection } from './auth-section';
import { SettingsButton } from './settings-button';

export function SettingsSection() {
  return (
    <ul className='flex flex-col gap-2'>
      <SettingsButton />
      <AuthSection />
    </ul>
  );
}
