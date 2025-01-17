import { ActionButton } from '@/components/action-button';
import { Modal } from '@/components/modal';
import { Input } from '@/components/ui/input';
import { CreateInfographyBody } from '@/services/infogrpahies/schemas';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';

interface AddInfogrpahyButtonProps {
  stepId: number;
  onClick?: (data: CreateInfographyBody) => void;
}

export function AddInfogrpahyButton(props: AddInfogrpahyButtonProps) {
  return <AddInfogrpahyModal {...props} onClick={props.onClick} />;
}

interface AddInfogrpahyModalProps {
  stepId: number;
  onClick?: (data: CreateInfographyBody) => void;
}

function AddInfogrpahyModal(props: AddInfogrpahyModalProps) {
  const [image, setImage] = useState('');
  const [markdown, setMarkdown] = useState('');

  function handleMarkdownChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMarkdown(event.target.value);
  }

  // function handleMarkdownPaste(event: React.ClipboardEvent<HTMLInputElement>) {
  //   const clipboardData = event.clipboardData;
  //   const pastedText = clipboardData?.getData('text/plain');
  //   if (pastedText) {
  //     setImage(pastedText);
  //   }
  // }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.value);
  }

  function handleSubmit() {
    props.onClick?.({ image, markdown, stepId: props.stepId });
    setImage('');
    setMarkdown('');
  }

  return (
    <Modal title='Add step' trigger={<ActionButton label='Add' variant='secondary' icon={<Plus />} />}>
      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='markdown' className='sr-only'>
            Content
          </Label>
          <Input
            id='markdown'
            name='markdown'
            value={markdown}
            onChange={handleMarkdownChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Content'
          />
        </div>
        <div>
          <Label htmlFor='image' className='sr-only'>
            Image
          </Label>
          <Input
            id='image'
            name='image'
            value={image}
            onChange={handleImageChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Image'
          />
        </div>
      </div>

      <div className='flex gap-4'>
        <DialogClose asChild>
          <ActionButton label='Cancel' variant='secondary' />
        </DialogClose>
        <DialogClose asChild>
          <ActionButton icon={<Save />} label='Save' variant='primary' onClick={handleSubmit} />
        </DialogClose>
      </div>
    </Modal>
  );
}
