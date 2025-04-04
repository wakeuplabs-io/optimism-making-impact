import { ThreeDotsLoading } from '@/components/ui/three-dots-loading';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface SidebarListButtonProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

// Wrap with forwardRef to allow ref forwarding
export const SidebarListButton = React.forwardRef<HTMLDivElement, SidebarListButtonProps>(
  ({ isSelected, isDisabled, isLoading, children, onClick, className }, ref) => {
    const isButtonDisabled = isDisabled || isLoading;

    return (
      <div
        role='button'
        ref={ref}
        className={cn(
          `group flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-secondary`,
          {
            'text-dark-high bg-mi-stone-300 [&_svg]:text-primary': isSelected,
            'hover:bg-mi-stone-300 hover:text-dark-high transition-colors duration-200': !isButtonDisabled,
          },
          className,
        )}
        // disabled={isButtonDisabled}
        onClick={(e) => !isButtonDisabled && onClick && onClick(e)}
      >
        <div className='w-full flex flex-row justify-between items-center'>
          {children}
          {isLoading && <ThreeDotsLoading color='secondary' size='xs' />}
        </div>
      </div>
    );
  },
);

// Optional: set display name for better debugging
SidebarListButton.displayName = 'SidebarListButton';
