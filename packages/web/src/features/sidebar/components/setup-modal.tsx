import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/state';
import { User, UserCog } from 'lucide-react';
import { useState } from 'react';

interface SetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SetupModal({ open, onOpenChange }: SetupModalProps) {
  const userState = useUserStore((state) => state);
  const [newEditor, setNewEditor] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-xl gap-8 rounded-3xl p-8'>
        <DialogHeader className='flex-row items-center justify-between space-y-0'>
          <DialogTitle className='text-2xl font-medium'>Setup</DialogTitle>
        </DialogHeader>

        <div className='space-y-8'>
          <div>
            <p className='mb-4 text-xl text-[#bebebe]'>View Mode</p>
            <div className='flex rounded-2xl bg-[#f1f4f9] p-1'>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 transition-colors ${
                  userState.isAdminModeEnabled ? 'text-[#9e9e9e] hover:text-[#4e4e4e]' : 'bg-white shadow-sm'
                }`}
                onClick={() => userState.toggleAdminMode()}
              >
                <User className='h-5 w-5' />
                <span>User</span>
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 transition-colors ${
                  userState.isAdminModeEnabled ? 'bg-white shadow-sm' : 'text-[#9e9e9e] hover:text-[#4e4e4e]'
                }`}
                onClick={() => userState.toggleAdminMode()}
              >
                <UserCog className='h-5 w-5' />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div>
            <p className='mb-4 text-xl text-[#bebebe]'>Manage Editors</p>
            <div className='space-y-4 rounded-2xl border border-[#d9d9d9] bg-white p-4'>
              {userState.adminUsers.map((user) => (
                <div key={user.email} className='flex items-center justify-between'>
                  <span className='text-[#4e4e4e]'>{user.email}</span>
                  <Button variant='ghost' className='text-[#bebebe] hover:text-[#4e4e4e]' onClick={() => userState.revokeAdmin(user.email)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className='mb-4 text-xl text-[#bebebe]'>New Editor</p>
            <div className='flex gap-4'>
              <Input
                type='email'
                placeholder='Email'
                value={newEditor}
                onChange={(e) => setNewEditor(e.target.value)}
                className='flex-1 rounded-2xl border-[#d9d9d9]'
              />
              <Button
                onClick={() => userState.grantAdmin(newEditor)}
                className='rounded-2xl bg-[#10111a] px-8 text-white hover:bg-[#10111a]/90'
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
