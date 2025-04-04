import { SidebarListButton, SidebarListButtonProps } from './sidebar-list-button';
import { WakeUpLogo } from './wakeup-logo';
import { Sheet, SheetClose, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';
import { useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { GithubLink } from './github-link';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { DialogTitle } from '@radix-ui/react-dialog';


interface Item {
  id: number;
  item: React.ReactElement<typeof SidebarListButton>;
}

interface SidebarSectionListProps {
  id: string;
  isAdmin: boolean;
  items: Item[];
  title?: React.ReactNode;
  addItem?: React.ReactNode;
  maxItems?: number;
  className?: string;
  isLoading?: boolean;
}

export function SidebarSectionList({
  id,
  isAdmin,
  items,
  title,
  addItem,
  maxItems,
  className,
  isLoading = false,
}: SidebarSectionListProps) {
  const [isOpenViewAll, setIsOpenViewAll] = useState(false);

  const [itemsToShow, viewAllItems] = useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return [items, []];
    }

    let sectionItems = [...items];
    const selectedItemIdx = sectionItems.findIndex((item) => (item.item.props as SidebarListButtonProps).isSelected);

    if (selectedItemIdx >= maxItems) {
      sectionItems = [...sectionItems.splice(selectedItemIdx, 1), ...sectionItems];
    }

    const itemsToShow = sectionItems.slice(0, maxItems);

    return [itemsToShow, items];
  }, [items, maxItems]);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {title && <p className={cn('text-xs font-normal text-gray-700', className)}>{title}</p>}
      <ul className='flex flex-col gap-2'>
        {isLoading && <Skeleton count={3} height={36} borderRadius={10} className='my-2 px-3' />}
        {!isLoading && itemsToShow.length === 0 && <p className='text-center text-sm'>There are no {id} yet.</p>}
        {!isLoading && itemsToShow.map(({ id, item }) => <li key={id}>{item}</li>)}
        {!isLoading && viewAllItems.length > 0 && (
          <li key={`sidebar-section-list-view-more-${id}`}>
            <SidebarListButton onClick={() => setIsOpenViewAll(true)}>
              <div className='flex flex-row gap-2'>
                <Ellipsis className='h-[20px] w-[20px]' />
                <span className='truncate text-sm'>View all {title}</span>
              </div>
            </SidebarListButton>
          </li>
        )}
        {!isLoading && isAdmin && addItem && <li key={`sidebar-section-list-add-item-${id}`}>{addItem}</li>}
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
      <SheetContent side='left' className='w-[308px] px-8 py-20 overflow-y-auto' overlayClassName='bg-inherit' aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>
            ViewAllSidebar
          </DialogTitle>
        </VisuallyHidden>
        <div className='flex w-full flex-col gap-8 justify-between'>
          <div className='flex h-full w-full flex-col gap-2'>
            <p className='text-xs font-normal text-gray-700'>All {title}</p>
            <SheetClose>{children}</SheetClose>
          </div>
          <div className="flex flex-row gap-2 h-[61px]">
            <WakeUpLogo />
            <GithubLink />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
