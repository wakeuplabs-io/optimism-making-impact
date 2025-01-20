import { IconButton } from '@/components/icon-button';
import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { CreateInfographyBody } from '@/services/infogrpahies/schemas';
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
      title='Add step'
      trigger={<IconButton variant='secondary' icon={<Plus />} />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='markdown' value={markdown} onChange={handleMarkdownChange} placeholder='Content' />
        <TextInput name='image' value={image} onChange={handleImageChange} placeholder='Image' />
      </div>
    </Modal>
  );
}
