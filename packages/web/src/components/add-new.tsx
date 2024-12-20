import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type AddNewProps = {
  text: string;
  onClick: () => void;
};
export function AddNew(props: AddNewProps) {
  return (
    <Button
      className="flex justify-start bg-white-high p-2.5 text-sm font-normal text-dark-medium shadow-none hover:bg-white-medium hover:text-dark-high 2xl:text-base"
      onClick={props.onClick}
    >
      <Plus strokeWidth={3} style={{ opacity: '50%' }} /> <span>{props.text}</span>
    </Button>
  );
}
