import { SideMenu } from '@/components/side-menu';
import { SidebarContent } from '@/features/sidebar';
import { useIsMobile } from '@/hooks/use-tresholds';
import { getRoundName } from '@/lib/utils';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
import { Menu } from 'lucide-react';
import { useMemo } from 'react';

export function SidebarSection() {
  const isMobile = useIsMobile();
  const { selectedRound, selectedCategoryId } = useSidebarStore((state) => state);

  const title = useMemo(() => {
    if (!selectedRound) {
      return 'Round';
    }

    const category = selectedRound.categories.find((category) => category.id === selectedCategoryId);

    if (!category) {
      return getRoundName(selectedRound.id);
    }

    return category.name;
  }, [selectedRound, selectedCategoryId]);

  if (isMobile) {
    return (
      <nav className='flex w-full items-center justify-start gap-12 bg-[#F1F4F9] px-8 pb-7 pt-14 lg:static'>
        <SideMenu
          trigger={<Menu className='h-[50px] w-[50px] text-black' strokeWidth={1} />}
          description='Sidebar'
          side='left'
          className='w-[308px] overflow-y-auto'
          triggerAsChild
        >
          <SidebarContent />
        </SideMenu>
        <span className='text-2xl font-semibold text-secondary'>{title}</span>
      </nav>
    );
  }

  return (
    <nav className='h-full w-[308px] overflow-y-auto overflow-x-hidden bg-white-high px-8 pt-10 lg:static'>
      <SidebarContent />
    </nav>
  );
}
