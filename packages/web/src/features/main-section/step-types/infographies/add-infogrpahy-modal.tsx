import { ActionButton } from '@/components/action-button';
import { Modal } from '@/components/modal';
import { TextAreaInput } from '@/components/text-area-input';
import { TextInput } from '@/components/text-input';
import { CreateInfographyBody } from '@/services/infogrpahies/schemas';
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';

interface AddInfogrpahyButtonProps {
  stepId: number;
  className?: string;
  onClick?: (data: CreateInfographyBody) => void;
}

export function AddInfogrpahyButton({ className, ...props }: AddInfogrpahyButtonProps) {
  return <AddInfogrpahyModal {...props} buttonClassName={className} onClick={props.onClick} />;
}

interface AddInfogrpahyModalProps {
  stepId: number;
  buttonClassName?: string;
  onClick?: (data: CreateInfographyBody) => void;
}

function AddInfogrpahyModal(props: AddInfogrpahyModalProps) {
  const [image, setImage] = useState('');
  const [markdown, setMarkdown] = useState('');

  function handleMarkdownChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMarkdown(event.target.value);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.value);
  }

  function handleSubmit() {
    props.onClick?.({ image, markdown, stepId: props.stepId });
    setImage('');
    setMarkdown('');
  }

  return (
    <Modal
      title='Add Infography'
      trigger={<ActionButton label='Add new' variant='secondary' icon={<Plus />} className={props.buttonClassName} />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextAreaInput name='markdown' rows={7} value={markdown} onChange={handleMarkdownChange} placeholder='Content' />
        <TextInput name='image' value={image} onChange={handleImageChange} placeholder='Image' />
      </div>
    </Modal>
  );
}
