import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { forwardRef } from 'react';

type AddNewContentProps = {
  buttonText: string;
  addNewContent?: () => void;
};
export const AddNewContent = forwardRef<HTMLButtonElement, AddNewContentProps>(({ buttonText, addNewContent, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className="flex items-center justify-start rounded-xl bg-white-high px-2.5 py-5 shadow-none hover:bg-white-medium"
      onClick={addNewContent}
      {...props}
    >
      <Plus strokeWidth={3} style={{ opacity: '30%' }} />
      <span className="text-sm font-medium leading-5 text-dark-high 2xl:text-base">{buttonText}</span>
    </Button>
  );
});
AddNewContent.displayName = 'AddNewContent';
