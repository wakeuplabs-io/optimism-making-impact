import { cn } from '@/lib/utils';
import { Blocks, Pencil, X } from 'lucide-react';

type CategoryButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  iconURL?: string;
  isAdmin?: boolean;
};

export function CategoryButton(props: CategoryButtonProps) {
  return (
    <button
      className={cn(
        `group flex w-full items-center justify-between gap-1 rounded-[10px] px-4 py-2 text-secondary shadow-none hover:bg-[#B8B8B8] hover:text-dark-high`,
        props.isActive && 'text-dark-high',
      )}
      onClick={props.onClick}
    >
      <div className='flex w-full items-center gap-2 overflow-hidden'>
        <div className='h-[22px] w-[22px]'>
          {props.iconURL ? (
            <img src={props.iconURL} className='h-[22px] w-[22px]' />
          ) : (
            // DEFAULT:
            <Blocks className='h-[22px] w-[22px]' />
          )}
        </div>
        <span className='overflow-hidden truncate whitespace-nowrap text-sm font-semibold leading-5 2xl:text-base'>{props.label}</span>
      </div>
      {props.isAdmin && (
        <div className='hidden gap-1 group-hover:flex'>
          <Pencil size={14} className='stroke-[#4E4E4E] hover:stroke-black' />
          <X size={14} className='stroke-[#4E4E4E] hover:stroke-black' />
        </div>
      )}
    </button>
  );
}
