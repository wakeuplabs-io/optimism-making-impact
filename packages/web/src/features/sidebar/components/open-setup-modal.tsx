'use client';

import { Modal } from '@/components/modal';
import { useState } from 'react';

interface OpenSetupModalProps {
  onSave: () => void;
}

export function OpenSetupModal(_props: OpenSetupModalProps) {
  const [viewMode, setViewMode] = useState<'User' | 'Admin'>('User');
  const [editors, setEditors] = useState<string[]>(['user1@gmail.com', 'user2@gmail.com']);
  const [newEditor, setNewEditor] = useState('');

  function handleDelete(editor: string) {
    setEditors((prev) => prev.filter((e) => e !== editor));
  }

  function handleAdd() {
    if (!newEditor.trim()) return;
    setEditors((prev) => [...prev, newEditor.trim()]);
    setNewEditor('');
  }

  return (
    <Modal
      title='Setup'
      // 1) The trigger is up to you. If you want a link or icon, adjust here:
      trigger={<button className='text-sm font-medium text-gray-600 hover:underline'>Setup</button>}
      // 2) If your Modal provides “Close” or “Confirm” buttons, you can pass them in the `buttons` prop.
      //   Otherwise, we can leave it empty to rely on a built-in close button or just an `X`.
      buttons={[]}
    >
      {/**
       * 3) If your <Modal> does NOT add a wrapper with background, border-radius, or padding,
       *    you can add them here. Adjust the width, radius, or shadows to match your Figma design.
       */}
      <div className='w-[400px] space-y-6 bg-white p-6'>
        {/* VIEW MODE */}
        <div className='space-y-2'>
          <label className='block text-sm font-semibold text-gray-600'>View Mode</label>
          <div className='flex items-center gap-2'>
            {/* A simple segmented toggle */}
            <div className='flex gap-0.5 rounded-md border border-gray-200 p-0.5'>
              <button
                onClick={() => setViewMode('User')}
                className={`rounded px-3 py-1 text-sm transition ${
                  viewMode === 'User' ? 'bg-black font-medium text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                User
              </button>
              <button
                onClick={() => setViewMode('Admin')}
                className={`rounded px-3 py-1 text-sm transition ${
                  viewMode === 'Admin' ? 'bg-black font-medium text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* MANAGE EDITORS */}
        <div className='space-y-3'>
          <label className='block text-sm font-semibold text-gray-600'>Manage Editors</label>

          <div className='space-y-2'>
            {editors.map((editor) => (
              <div key={editor} className='flex items-center justify-between rounded border border-gray-200 px-3 py-2'>
                <span className='text-sm text-gray-800'>{editor}</span>
                <button onClick={() => handleDelete(editor)} className='text-sm text-red-500 hover:text-red-600'>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* NEW EDITOR */}
        <div className='space-y-2'>
          <label htmlFor='newEditor' className='block text-sm font-semibold text-gray-600'>
            New Editor
          </label>
          <div className='flex items-center gap-2'>
            <input
              id='newEditor'
              type='email'
              value={newEditor}
              onChange={(e) => setNewEditor(e.target.value)}
              placeholder='Email'
              className='flex-1 rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300'
            />
            <button onClick={handleAdd} className='rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90'>
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
