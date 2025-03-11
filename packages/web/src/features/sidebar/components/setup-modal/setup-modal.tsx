import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog-full-screen-mobile';
import { useUserStore } from '@/state';
import { User, UserCog } from 'lucide-react';
import { useEffect } from 'react';
import { EditorList } from './editor-list';
import { AddEditorForm } from './add-editor-form';

interface SetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SetupModal({ open, onOpenChange }: SetupModalProps) {
  const isAdminModeEnabled = useUserStore((state) => state.isAdminModeEnabled);
  const getAdminUsers = useUserStore((state) => state.getAdminUsers);
  const toggleAdminMode = useUserStore((state) => state.toggleAdminMode);

  useEffect(() => {
    getAdminUsers();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='md:max-w-xl gap-8 rounded-3xl p-8'>
        <DialogHeader>
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
                <User className='h-5 w-5' />
                <span>User</span>
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3 transition-colors ${
                  isAdminModeEnabled ? 'bg-white shadow-sm' : 'text-[#9e9e9e] hover:text-[#4e4e4e]'
                }`}
                onClick={() => toggleAdminMode()}
              >
                <UserCog className='h-5 w-5' />
                <span>Admin</span>
              </button>
            </div>
          </div>
          <EditorList />
          <AddEditorForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
