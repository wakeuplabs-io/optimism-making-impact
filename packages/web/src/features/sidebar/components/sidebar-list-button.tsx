import { cn } from '@/lib/utils';

export interface SidebarListButtonProps {
  isSelected: boolean;
  children?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function SidebarListButton({ isSelected, children, onClick }: SidebarListButtonProps) {
  return (
    <button
      className={cn(
        `group flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-secondary hover:bg-mi-stone-300 hover:text-dark-high [&_svg]:hover:text-primary transition-colors duration-200`,
        {
          'text-dark-high bg-mi-stone-300 [&_svg]:text-primary': isSelected,
        },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
