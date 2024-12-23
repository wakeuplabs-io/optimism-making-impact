import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type AddNewContentProps = {
  buttonText: string;
  addNewContent?: () => void;
};
export function AddNewContent(props: AddNewContentProps) {
  return (
    <Button
      className="flex items-center justify-start rounded-xl bg-white-high px-2.5 py-5 shadow-none hover:bg-white-medium"
      onClick={props.addNewContent}
    >
      <Plus strokeWidth={3} style={{ opacity: '30%' }} />
      <span className="text-sm font-medium leading-5 text-dark-high 2xl:text-base">{props.buttonText}</span>
    </Button>
  );
}
