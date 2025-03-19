import { useUser } from '@/hooks/use-user';

export function IsAdminIndicator() {
  const { isAdminModeEnabled, toggleAdminMode } = useUser();

  return (
    <button className='absolute bottom-20 right-4 rounded-xl bg-primary p-4 text-white lg:bottom-4' onClick={toggleAdminMode}>
      <div>Admin: {isAdminModeEnabled.toString()}</div>
      <div>
        <span>Toggle</span>
      </div>
    </button>
  );
}
