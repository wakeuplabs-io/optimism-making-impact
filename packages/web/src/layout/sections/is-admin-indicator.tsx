import { useUserStore } from '@/state';

export function IsAdminIndicator() {
  const { isAdmin, toggleUserAdmin } = useUserStore((state) => state);

  return (
    <button className='absolute bottom-20 right-4 rounded-xl bg-primary p-4 text-white lg:bottom-4' onClick={toggleUserAdmin}>
      <div>Admin: {isAdmin.toString()}</div>
      <div>
        <span>Toggle</span>
      </div>
    </button>
  );
}
