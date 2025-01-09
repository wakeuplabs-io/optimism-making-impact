import { Button } from '@/components/ui/button';
import { Blocks } from 'lucide-react';

type CategoryButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
  iconURL?: string;
};

export function CategoryButton(props: CategoryButtonProps) {
  return (
    <Button
      className={`flex w-full items-center justify-start rounded-xl px-2.5 py-5 shadow-none hover:text-dark-high ${
        props.isActive ? 'bg-background text-dark-high hover:bg-background' : 'bg-white-high text-secondary hover:bg-white-medium'
      }`}
      onClick={props.onClick}
    >
      {props.iconURL ? (
        <img src={props.iconURL} className="h-[22px] w-[22px]" />
      ) : (
        <Blocks strokeWidth={1.7} style={{ width: '22px', height: '22px' }} />
      )}
      <span className="text-sm font-semibold leading-5 2xl:text-base">{props.label}</span>
    </Button>
  );
}
