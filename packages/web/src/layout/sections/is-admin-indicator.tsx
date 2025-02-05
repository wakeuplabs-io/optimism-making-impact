import { useUserStore } from '@/state';

export function IsAdminIndicator() {
  const { user, toggleUserAdmin } = useUserStore((state) => state);

  return (
    <button className='absolute bottom-20 right-4 rounded-xl bg-primary p-4 text-white lg:bottom-4' onClick={toggleUserAdmin}>
      <div>Admin: {user.isAdmin.toString()}</div>
      <div>
        <span>Toggle</span>
      </div>
    </button>
  );
}
