import { useState } from 'react';
import { SidebarListButton } from '../sidebar-list-button';
import { Settings } from 'lucide-react';
import SetupModal from '../setup-modal';

export function SettingsButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SidebarListButton onClick={() => setOpen(true)}>
        <>
          <Settings className='h-[20px] w-[20px]' />
          <span className='text-sm'>Setup</span>
        </>
      </SidebarListButton>
      <SetupModal open={open} onOpenChange={setOpen} />
    </>
  );
}
