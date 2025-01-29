import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { Modal } from '@/components/modal';
import { TextInput } from '@/components/text-input';
import { capitalizeFirst } from '@/lib/utils';
import { SmartListsService } from '@/services/smart-lists/service';
import { CreateStepBody } from '@/services/steps/schemas';
import { StepType, stepTypes } from '@/types';
import { Plus, Save } from 'lucide-react';
import { useEffect, useState } from 'react';

const options = stepTypes.map((type) => ({
  value: type,
  label: capitalizeFirst(type),
}));
const emptySmartListOption = { label: 'None', value: '0' };

interface AddStepModalProps {
  roundId: number;
  onClick?: (roundId: number, data: CreateStepBody) => void;
}

export function AddStepModal(props: AddStepModalProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [type, setType] = useState<string>(options[0].value);
  const [smartListsOptions, setSmartListsOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedSmartListId, setSelectedSmartListId] = useState(0);

  useEffect(() => {
    SmartListsService.getByRoundId(props.roundId).then((res) => {
      const smartListsOptions = res.smartLists.map((smartList) => ({ label: smartList.title, value: smartList.id.toString() }));
      setSmartListsOptions([emptySmartListOption, ...smartListsOptions]);
    });
  }, [props.roundId]);

  function clear() {
    setTitle('');
    setIcon('');
    setType(options[0].value);
    setSelectedSmartListId(0);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleIconChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIcon(event.target.value);
  }

  function handleTypeChange(value: string) {
    setType(value);
  }

  function handleSmartListChange(value: string) {
    setSelectedSmartListId(+value);
  }

  function handleSubmit() {
    const selectedType = type as StepType;

    const shouldAddSmartList = type === 'CARDS' && selectedSmartListId !== 0;

    props.onClick?.(props.roundId, {
      title,
      icon,
      type: selectedType,
      roundId: props.roundId,
      smartListId: shouldAddSmartList ? selectedSmartListId : undefined,
    });
    clear();
  }

  return (
    <Modal
      onOpenChange={(open) => !open && clear()}
      title='Add step'
      trigger={<IconButton variant='secondary' icon={<Plus className='text-white' />} />}
      buttons={[
        { label: 'Cancel', variant: 'secondary' },
        { label: 'Save', variant: 'primary', disabled: false, icon: <Save />, onClick: handleSubmit },
      ]}
    >
      <div className='flex flex-col gap-4'>
        <TextInput name='Title' placeholder='Title' value={title} onChange={handleTitleChange} />
        <TextInput name='Icon' placeholder='Icon' value={icon} onChange={handleIconChange} />
        <SelectInput name='Type' items={options} onValueChange={handleTypeChange} value={type} />
        {type === 'CARD' && (
          <SelectInput
            name='Smart List'
            items={smartListsOptions}
            onValueChange={handleSmartListChange}
            value={selectedSmartListId.toString()}
          />
        )}
      </div>
    </Modal>
  );
}
