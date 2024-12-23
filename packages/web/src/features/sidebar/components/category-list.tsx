import { Button } from '@/components/ui/button';
import { Blocks } from 'lucide-react';

export function CategoryList() {
  return <ul>Category List</ul>;
}

type IconButtonProps = {
  text: string;
  isActive: boolean;
};
export function IconButton(props: IconButtonProps) {
  return (
    <Button
      className={`flex w-full items-center justify-start rounded-xl px-2.5 py-5 shadow-none hover:text-dark-high ${
        props.isActive ? 'bg-background text-dark-high hover:bg-background' : 'bg-white-high text-secondary hover:bg-white-medium'
      }`}
    >
      <Blocks strokeWidth={1.7} style={{ width: '22px', height: '22px' }} />
      <span className="text-sm font-semibold leading-5 2xl:text-base">{props.text}</span>
    </Button>
  );
}
