import { AddEditorForm } from './add-editor-form';
import { EditorList } from './editor-list';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog-full-screen-mobile';
import { useUser } from '@/hooks/use-user';
import { UsersService } from '@/services/users-service';
import { useQuery } from '@tanstack/react-query';
import { User, UserCog } from 'lucide-react';

interface SetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SetupModal({ open, onOpenChange }: SetupModalProps) {
  const { isAdminModeEnabled, toggleAdminMode } = useUser();

  const { data: adminUsers = [], isLoading: isAdminUsersLoading } = useQuery({
    queryKey: ['editors'],
    queryFn: () => UsersService.getEditors(),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-screen gap-8 p-4 overflow-y-auto sm:p-8 rounded-3xl md:max-w-xl'>
        <DialogHeader className='mb-8 md:mb-0'>
          <DialogTitle className='text-2xl font-medium'>Setup</DialogTitle>
        </DialogHeader>
        <div className='space-y-8'>
          <div>
            <p className='mb-4 text-xl text-[#bebebe]'>View Mode</p>
            <div className='flex rounded-xl bg-[#f1f4f9] p-1'>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3 transition-colors ${
                  isAdminModeEnabled ? 'text-[#9e9e9e] hover:text-[#4e4e4e]' : 'bg-white shadow-sm'
                }`}
                onClick={() => toggleAdminMode()}
              >
                <User className='w-5 h-5' />
                <span>User</span>
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3 transition-colors ${
                  isAdminModeEnabled ? 'bg-white shadow-sm' : 'text-[#9e9e9e] hover:text-[#4e4e4e]'
                }`}
                onClick={() => toggleAdminMode()}
              >
                <UserCog className='w-5 h-5' />
                <span>Admin</span>
              </button>
            </div>
          </div>
          <EditorList adminUsers={adminUsers} isAdminUsersLoading={isAdminUsersLoading} />
          <AddEditorForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
