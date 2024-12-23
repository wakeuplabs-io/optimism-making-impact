import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type AddNewProps = {
  text: string;
  onClick: () => void;
};
export function AddNew(props: AddNewProps) {
  return (
    <Button
      className="flex items-center justify-start rounded-xl bg-white-high px-2.5 py-5 shadow-none hover:bg-white-medium"
      onClick={props.onClick}
    >
      <Plus strokeWidth={3} style={{ opacity: '30%' }} />
      <span className="text-sm font-medium leading-5 text-dark-high 2xl:text-base">{props.text}</span>
    </Button>
  );
}
