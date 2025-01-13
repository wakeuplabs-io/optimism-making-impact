import { ActionButton } from '@/components/action-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSidebarStore } from '@/state';
import { CategoryFormData } from '@/state/sidebar/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { Save } from 'lucide-react';
import { useState } from 'react';

export function NewCategoryForm() {
  const categoriesState = useSidebarStore((state) => state);

  const [formData, setFormData] = useState<CategoryFormData>({
    title: '',
    iconURL: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    categoriesState.addCategory(formData, categoriesState.selectedRound.id);

    setFormData({ title: '', iconURL: '' });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='title' className='sr-only'>
            Title
          </Label>
          <Input
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Title'
          />
        </div>
        <div>
          <Label htmlFor='icon' className='sr-only'>
            Icon URL
          </Label>
          <Input
            id='icon'
            name='iconURL'
            value={formData.iconURL}
            onChange={handleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='https://link-to-your-icon'
          />
        </div>
      </div>
      <div className='flex gap-2 pt-9'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <DialogClose asChild>
          <ActionButton icon={<Save />} label='Save' variant='primary' type='submit' />
        </DialogClose>
      </div>
    </form>
  );
}
