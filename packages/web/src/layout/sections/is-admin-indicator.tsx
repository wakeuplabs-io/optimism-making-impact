import { useUserStore } from '@/state';

export function IsAdminIndicator() {
  const { isAdmin, toggleUserAdmin } = useUserStore((state) => state);

  return (
    <div className="absolute bottom-4 right-4 rounded-xl bg-primary p-4 text-white">
      <div>Admin: {isAdmin.toString()}</div>
      <div>
        <button onClick={toggleUserAdmin}>Toggle</button>
      </div>
    </div>
  );
}
