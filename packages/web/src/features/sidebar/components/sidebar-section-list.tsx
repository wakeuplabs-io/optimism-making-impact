import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import { SidebarListButton } from './sidebar-list-button';
import { Ellipsis } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { WakeUpLogo } from './wakeup-logo';

interface Item {
  id: number;
  item: React.ReactNode;
}

interface SidebarSectionListProps {
  id: string;
  isAdmin: boolean;
  items: Item[];
  title?: React.ReactNode;
  addItem?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

export function SidebarSectionList({ id, isAdmin, items, title, addItem, maxItems, className }: SidebarSectionListProps) {
  const [isOpenViewAll, setIsOpenViewAll] = useState(false);

  const [itemsToShow, viewAllItems] = useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return [items, []];
    }

    const viewAllItems = items.slice(maxItems);
    const itemsToShow = items.slice(0, maxItems);

    return [itemsToShow, viewAllItems];
  }, [items, maxItems]);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title && <p className={cn('text-xs font-normal text-gray-700', className)}>{title}</p>}
      <ul className='flex flex-col gap-2'>
        {itemsToShow.map(({ id, item }) => (
          <li key={id}>{item}</li>
        ))}
        {viewAllItems.length > 0 && (
          <li key={`sidebar-section-list-view-more-${id}`}>
            <SidebarListButton onClick={() => setIsOpenViewAll(true)}>
              <Ellipsis className='h-[20px] w-[20px]' />
              <span className='truncate text-sm'>View all {title}</span>
            </SidebarListButton>
          </li>
        )}
        {isAdmin && addItem && <li key={`sidebar-section-list-add-item-${id}`}>{addItem}</li>}
      </ul>
      <ViewAllSidebar title={title} isOpen={isOpenViewAll} onOpenChange={(open) => setIsOpenViewAll(open)}>
        <ul className='flex flex-col gap-2'>
          {viewAllItems.map(({ id, item }) => (
            <li key={id}>{item}</li>
          ))}
        </ul>
      </ViewAllSidebar>
    </div>
  );
}

interface ViewAllSidebarProps {
  isOpen: boolean;
  title: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

function ViewAllSidebar({ isOpen, title, onOpenChange, children }: ViewAllSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger></SheetTrigger>
      <SheetContent side='left' className='w-[320px] py-20 px-8' overlayClassName='bg-inherit'>
        <div className='flex flex-col h-full w-full justify-between'>
          <div className='flex h-full w-full flex-col gap-2'>
            <p className='text-xs font-normal text-gray-700'>All {title}</p>
            {/* capture click on children and close the sheet */}
            <div onClick={() => onOpenChange(false)}>{children}</div>
          </div>
          <WakeUpLogo />
        </div>
      </SheetContent>
    </Sheet>
  );
}
