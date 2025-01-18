import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { Infography } from '@/types/infographies';
import { Save } from 'lucide-react';
import { useState } from 'react';

interface EditInfogrpahyImageModalProps {
  infography: Infography;
  onClick?: (stepId: number, image: string) => void;
  open: boolean;
  onClose: () => void;
}

export function EditInfogrpahyImageModal(props: EditInfogrpahyImageModalProps) {
  const [image, setImage] = useState(props.infography.image);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImage(event.target.value);
  }

  function handleSave() {
    props.onClick?.(props.infography.id, image);
    props.onClose();
  }

  function handleClose() {
    props.onClick?.(props.infography.id, image);
    props.onClose();
  }

  return (
    <Modal
      open={props.open}
      title='Edit image'
      buttons={[
        { label: 'Cancel', variant: 'secondary', onClick: handleClose },
        { label: 'Save', variant: 'primary', icon: <Save />, onClick: handleSave },
      ]}
    >
      <div className='grid gap-4 py-4'>
        <TextInput name='image' value={image} onChange={handleChange} placeholder='Image' />
      </div>
    </Modal>
  );
}
