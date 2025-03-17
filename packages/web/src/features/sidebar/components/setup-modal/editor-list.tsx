import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/main';
import { Editors, UsersService } from '@/services/users-service';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LoaderCircle } from 'lucide-react';

export function EditorList(props: { adminUsers: Editors[]; isAdminUsersLoading: boolean }) {
  const { toast } = useToast();
  const revokeAdmin = useMutation({
    mutationFn: (email: string) => UsersService.revokeAdmin({ email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['editors'] });
    },
    onMutate: async (email: string) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['editors'] });

      // Snapshot the previous value
      const previousEditors = queryClient.getQueryData(['editors']);

      // Optimistically update to the new value
      queryClient.setQueryData(['editors'], (editors?: Editors[]) => editors?.filter((item) => item.email !== email) || []);

      // Return a context object with the snapshotted value
      return { previousEditors };
    },
    onError: (err, email, context) => {
      if (context?.previousEditors) {
        queryClient.setQueryData(['editors'], context.previousEditors);
      }
      let description = `Failed to revoke admin ${email}`;
      if (err instanceof AxiosError) {
        description = err.response?.data.error.message;
      }

      toast({ title: 'Failed to revoke admin', description, variant: 'destructive' });
    },
  });

  return (
    <div>
      <p className='mb-4 text-xl text-[#bebebe]'>Manage Editors</p>
      <div className='space-y-4 rounded-xl border border-[#d9d9d9] bg-white p-4'>
        {props.isAdminUsersLoading && <LoaderCircle className='!h-[20px] !w-[20px]' />}
        {props.adminUsers.map((user) => (
          <div key={user.email} className='flex items-center justify-between'>
            <span className='text-[#4e4e4e]'>{user.email}</span>
            <Button variant='ghost' className='text-[#bebebe] hover:text-[#4e4e4e]' onClick={() => revokeAdmin.mutate(user.email)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
