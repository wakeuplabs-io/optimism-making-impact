import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { Infography } from '@/types/infographies';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';

interface EditInfogrpahyImageModalProps {
  infography: Infography;
  onClick?: (stepId: number, image: string) => void;
}

export function EditInfogrpahyImageModal(props: EditInfogrpahyImageModalProps) {
  const [image, setImage] = useState(props.infography.image);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.value);
  }

  function handleSave() {
    props.onClick?.(props.infography.id, image);
  }

  return (
    <Modal
      title='Edit image'
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', icon: <Save />, closeOnClick: true, onClick: handleSave },
      ]}
      trigger={
        <div className='flex h-full w-full cursor-pointer items-center justify-center'>
          <Pencil className='text-white hover:text-gray-400' />
        </div>
      }
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='image' value={image} onChange={handleChange} placeholder='Image' />
      </div>
    </Modal>
  );
}
