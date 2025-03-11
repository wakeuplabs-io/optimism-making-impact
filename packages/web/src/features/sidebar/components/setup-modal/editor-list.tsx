import { Button } from '@/components/ui/button';
import { useUserStore } from '@/state';

export function EditorList() {
  const adminUsers = useUserStore((state) => state.adminUsers);
  const revokeAdmin = useUserStore((state) => state.revokeAdmin);

  if (!adminUsers) {
    return null;
  }

  return (
    <div>
      <p className='mb-4 text-xl text-[#bebebe]'>Manage Editors</p>
      <div className='space-y-4 rounded-xl border border-[#d9d9d9] bg-white p-4'>
        {adminUsers.map((user) => (
          <div key={user.email} className='flex items-center justify-between'>
            <span className='text-[#4e4e4e]'>{user.email}</span>
            <Button variant='ghost' className='text-[#bebebe] hover:text-[#4e4e4e]' onClick={() => revokeAdmin(user.email)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
