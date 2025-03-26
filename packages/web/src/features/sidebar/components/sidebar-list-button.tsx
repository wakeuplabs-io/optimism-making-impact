import { ThreeDotsLoading } from '@/components/ui/three-dots-loading';
import { cn } from '@/lib/utils';

export interface SidebarListButtonProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export function SidebarListButton({ isSelected, isDisabled, isLoading, children, onClick, className }: SidebarListButtonProps) {
  const isButtonDisabled = isDisabled || isLoading;
  return (
    <button
      className={cn(
        `group flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-secondary`,
        {
          'text-dark-high bg-mi-stone-300 [&_svg]:text-primary': isSelected,
          'hover:bg-mi-stone-300 hover:text-dark-high transition-colors duration-200': !isButtonDisabled,
        },
        className,
      )}
      disabled={isButtonDisabled}
      onClick={onClick}
    >
      <div className='w-full flex flex-row justify-between items-center'>
        {children}
        {isLoading && <ThreeDotsLoading color='secondary' size='xs' />}
      </div>
    </button>
  );
}
