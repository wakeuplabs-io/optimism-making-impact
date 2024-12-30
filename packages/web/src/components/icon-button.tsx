import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { Trash } from 'lucide-react';

type IconButtonProps = {
  variant: string;
};
export function IconButton(props: IconButtonProps) {
  const saveButton = (
    <Button type="submit" className="flex-1 rounded-3xl bg-primary px-10 py-[22px] text-lg font-light text-white-high 2xl:text-xl">
      <Save strokeWidth={2} style={{ width: '22px', height: '22px', marginRight: '5px' }} /> Save
    </Button>
  );

  const deleteButton = (
    <Button className="flex-1 rounded-3xl bg-dark-high px-10 py-[22px] text-lg font-light text-white-high 2xl:text-xl">
      <Trash strokeWidth={2} style={{ width: '22px', height: '22px', marginRight: '5px' }} /> Delete
    </Button>
  );

  return props.variant == 'save' ? saveButton : deleteButton;
}
