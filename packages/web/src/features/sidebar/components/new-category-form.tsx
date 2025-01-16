import { ActionButton } from '@/components/action-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSidebarStore } from '@/state';
import { DialogClose } from '@radix-ui/react-dialog';
import { Save } from 'lucide-react';
import { useState } from 'react';

export function NewCategoryForm() {
  const categoriesState = useSidebarStore((state) => state);
  const [title, setTitle] = useState('');
  const [iconURL, setIconURL] = useState('');

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleIconURLChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIconURL(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    categoriesState.addCategory(title, iconURL, categoriesState.selectedRound.id);

    // Reset the states after submission
    setTitle('');
    setIconURL('');
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
            value={title}
            onChange={handleTitleChange}
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
            value={iconURL}
            onChange={handleIconURLChange}
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
