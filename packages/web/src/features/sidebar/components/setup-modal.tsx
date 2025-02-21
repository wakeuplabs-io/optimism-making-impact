'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UsersService } from '@/services/users-service';
import { User, UserCog } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SetupModal({ open, onOpenChange }: SetupModalProps) {
  const [viewMode, setViewMode] = useState<'user' | 'admin'>('user');
  const [editors, setEditors] = useState<string[]>([]);
  const [newEditor, setNewEditor] = useState('');

  const resetEditorList = () => {
    UsersService.getEditors().then((users) => setEditors(users));
  };

  const handleDelete = async (email: string) => {
    // Optimistically update the UI
    setEditors((prev) => prev.filter((editor) => editor !== email));
    try {
      await UsersService.revokeAdmin({ email });
    } catch (error) {
      console.error('Error revoking admin:', error);
      // Optionally revert the change by re-fetching the list
      resetEditorList();
    }
  };

  const handleAdd = async () => {
    if (newEditor && !editors.includes(newEditor)) {
      // Optimistically update the UI
      setEditors((prev) => [...prev, newEditor]);
      try {
        await UsersService.grantAdmin({ email: newEditor });
        setNewEditor('');
      } catch (error) {
        console.error('Error granting admin:', error);
        // Optionally revert the optimistic update
        resetEditorList();
      }
    }
  };

  useEffect(() => {
    resetEditorList();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-xl gap-8 rounded-3xl p-8'>
        <DialogHeader className='flex-row items-center justify-between space-y-0'>
          <DialogTitle className='text-2xl font-medium'>Setup</DialogTitle>
        </DialogHeader>

        <div className='space-y-8'>
          <div>
            <h3 className='mb-4 text-xl text-[#bebebe]'>View Mode</h3>
            <div className='flex rounded-2xl bg-[#f1f4f9] p-1'>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 transition-colors ${
                  viewMode === 'user' ? 'bg-white shadow-sm' : 'text-[#9e9e9e] hover:text-[#4e4e4e]'
                }`}
                onClick={() => setViewMode('user')}
              >
                <User className='h-5 w-5' />
                <span>User</span>
              </button>
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 transition-colors ${
                  viewMode === 'admin' ? 'bg-white shadow-sm' : 'text-[#9e9e9e] hover:text-[#4e4e4e]'
                }`}
                onClick={() => setViewMode('admin')}
              >
                <UserCog className='h-5 w-5' />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className='mb-4 text-xl text-[#bebebe]'>Manage Editors</h3>
            <div className='space-y-4 rounded-2xl border border-[#d9d9d9] bg-white p-4'>
              {editors.map((email) => (
                <div key={email} className='flex items-center justify-between'>
                  <span className='text-[#4e4e4e]'>{email}</span>
                  <Button variant='ghost' className='text-[#bebebe] hover:text-[#4e4e4e]' onClick={() => handleDelete(email)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='mb-4 text-xl text-[#bebebe]'>New Editor</h3>
            <div className='flex gap-4'>
              <Input
                type='email'
                placeholder='Email'
                value={newEditor}
                onChange={(e) => setNewEditor(e.target.value)}
                className='flex-1 rounded-2xl border-[#d9d9d9]'
              />
              <Button onClick={handleAdd} className='rounded-2xl bg-[#10111a] px-8 text-white hover:bg-[#10111a]/90'>
                Add
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
