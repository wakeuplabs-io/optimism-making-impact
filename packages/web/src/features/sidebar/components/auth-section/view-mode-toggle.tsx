import { Button } from '@/components/ui/button';
import { useUserStore } from '@/state';
import { View } from 'lucide-react';
import { forwardRef } from 'react';

export const ViewModeToggle = forwardRef<HTMLButtonElement>((props, ref) => {
  const { isAdminModeEnabled, toggleAdminMode } = useUserStore((state) => state);

  return (
    <Button className='w-full justify-center rounded-xl' variant='slate' size='xl' onClick={toggleAdminMode} ref={ref} {...props}>
      <View className='!h-6 !w-6' strokeWidth={2} />
      {isAdminModeEnabled ? 'User View' : 'Admin View'}
    </Button>
  );
});
