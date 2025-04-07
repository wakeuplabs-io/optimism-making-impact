import { SetupModal } from '../setup-modal/setup-modal';
import { SidebarListButton } from '../sidebar-list-button';
import { Settings } from 'lucide-react';
import { useState } from 'react';

export function SettingsButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SidebarListButton onClick={() => setOpen(true)}>
        <div className='flex flex-row gap-2'>
          <Settings className='h-[20px] w-[20px]' />
          <span className='text-sm'>Setup</span>
        </div>
      </SidebarListButton>
      <SetupModal open={open} onOpenChange={setOpen} />
    </>
  );
}
