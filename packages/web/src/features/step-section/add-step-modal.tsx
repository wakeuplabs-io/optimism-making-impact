import { ActionButton } from '@/components/action-button';
import { AddStepButton } from '@/components/add-step-button';
import { Modal } from '@/components/modal';
import { Select } from '@/components/select';
import { Input } from '@/components/ui/input';
import { capitalizeFirst } from '@/lib/utils';
import { CreateStepBody } from '@/services/steps/schemas';
import { StepType, stepTypes } from '@/types';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Save } from 'lucide-react';
import { useState } from 'react';

const options = stepTypes.map((type) => ({
  value: type,
  label: capitalizeFirst(type),
}));

interface AddStepModalProps {
  roundId: number;
  onClick?: (roundId: number, data: CreateStepBody) => void;
}

export function AddStepModal(props: AddStepModalProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [type, setType] = useState<string>(options[0].value);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(event.target.value);
  }

  function handleTypeChange(value: string) {
    setType(value);
  }

  function handleSubmit() {
    const selectedType = type as StepType;
    props.onClick?.(props.roundId, { title, icon, type: selectedType, roundId: props.roundId });
    setTitle('');
    setIcon('');
  }

  return (
    <Modal title='Add step' trigger={<AddStepButton />}>
      <div className='grid gap-4 py-4'>
        <div>
          <Label htmlFor='name' className='sr-only'>
            Title
          </Label>
          <Input
            id='name'
            name='name'
            value={title}
            onChange={handleTitleChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Title'
          />
        </div>
        <div>
          <Label htmlFor='icon' className='sr-only'>
            Icon
          </Label>
          <Input
            id='icon'
            name='icon'
            value={icon}
            onChange={handleIconChange}
            className='py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low'
            placeholder='Icon'
          />
        </div>
        <div>
          <Label htmlFor='type' className='sr-only'>
            Type
          </Label>
          <Select items={options} placeholder='Select a type' defaultValue={options[0].value} onValueChange={handleTypeChange} />
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
