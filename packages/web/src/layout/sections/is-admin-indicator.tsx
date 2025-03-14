import { useUserStore } from '@/state/user-store/user-store';

export function IsAdminIndicator() {
  const { isAdminModeEnabled, toggleAdminMode } = useUserStore((state) => state);

  return (
    <button className='absolute bottom-20 right-4 rounded-xl bg-primary p-4 text-white lg:bottom-4' onClick={toggleAdminMode}>
      <div>Admin: {isAdminModeEnabled.toString()}</div>
      <div>
        <span>Toggle</span>
      </div>
    </button>
  );
}
