import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { Editors } from '@/services/users-service';
import { LoaderCircle } from 'lucide-react';

export function EditorList( props: {adminUsers: Editors[], isAdminUsersLoading: boolean}) {
  const { revokeAdmin } = useUser();

  if (!props.adminUsers) {
    return null;
  }

  return (
    <div>
      <p className='mb-4 text-xl text-[#bebebe]'>Manage Editors</p>
      <div className='space-y-4 rounded-xl border border-[#d9d9d9] bg-white p-4'>
        {props.isAdminUsersLoading && <LoaderCircle className='!h-[20px] !w-[20px]' />}
        {props.adminUsers.map((user) => (
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
