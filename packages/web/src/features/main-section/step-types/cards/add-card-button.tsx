import { ActionButton } from '@/components/action-button';
import { ColorDot } from '@/components/color-dot';
import { SelectInput } from '@/components/inputs/select-input';
import { Modal } from '@/components/modal';
import { MultiSelect } from '@/components/multi-select/multi-select';
import { TextAreaInput } from '@/components/text-area-input';
import { TextInput } from '@/components/text-input';
import { CreateCardBody } from '@/services/cards/schemas';
import { Attribute, Keyword, strengthArray, StrengthEnum } from '@/types';
import { Plus, Save } from 'lucide-react';
import { useMemo, useState } from 'react';

const dontAssignOption = { value: 0, label: <span>Don't assign</span> };

interface AddCardModalProps {
  stepId: number;
  onClick?: (data: CreateCardBody) => void;
  keywords: Keyword[];
  attributes?: Attribute[];
}

export function AddCardModal(props: AddCardModalProps) {
  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [strength, setStrength] = useState(StrengthEnum.MEDIUM);
  const [attributeId, setAttributeId] = useState<number>(dontAssignOption.value);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const keywordsOptions = useMemo(
    () => props.keywords.map((keyword) => ({ value: keyword.value, label: keyword.value })),
    [props.keywords],
  );

  const attributeOptions = useMemo(() => {
    if (!props.attributes) return [];

    const options = props.attributes.map((a) => ({
      value: a.id.toString(),
      label: (
        <div className='flex items-center gap-2'>
          <ColorDot color={a.color} />
          <span>{a.value}</span>
        </div>
      ),
    }));

    options.unshift({
      ...dontAssignOption,
      value: dontAssignOption.value.toString(),
    });

    return options;
  }, [props.attributes]);

  function clearForm() {
    setMarkdown('');
    setTitle('');
    setStrength(StrengthEnum.MEDIUM);
    setSelectedKeywords([]);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleMarkdownChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMarkdown(event.target.value);
  }
  function handleStrengthChange(value: string) {
    setStrength(value as StrengthEnum);
  }
  function handleAttributeChange(value: string) {
    setAttributeId(+value);
  }
  function handleKeywordsChange(value: string[]) {
    setSelectedKeywords(value);
  }

  function handleSubmit() {
    const selectedKeywordsValueAndId = selectedKeywords.map((value) => {
      const keyword = props.keywords.find((keyword) => keyword.value === value);
      return { value, id: keyword?.id };
    });

    props.onClick?.({
      title,
      markdown,
      stepId: props.stepId,
      keywords: selectedKeywordsValueAndId,
      strength,
      attributeId: attributeId < 1 ? undefined : attributeId,
    });
    setTitle('');
    setMarkdown('');
  }

  return (
    <Modal
      onOpenChange={clearForm}
      title='New card'
      trigger={<ActionButton label='Add card' variant='secondary' icon={<Plus />} className='w-[320px] lg:w-[250px]' />}
      buttons={[
        { label: 'Cancel', variant: 'secondary', closeOnClick: true },
        { label: 'Save', variant: 'primary', disabled: false, closeOnClick: true, icon: <Save />, onClick: handleSubmit },
      ]}
      contentProps={{
        onPointerDownOutside: (e) => {
          if (document.getElementById('multiselect-popover-content')) e.preventDefault();
        },
      }}
    >
      <div className='grid gap-4 py-4'>
        <SelectInput
          placeholder='Select Strength'
          name='strength'
          items={strengthOptions}
          triggerClassName='capitalize'
          itemClassName='capitalize'
          onValueChange={handleStrengthChange}
        />
        <SelectInput
          placeholder='Select Smart List Filter'
          name='attribute'
          items={attributeOptions}
          triggerClassName='capitalize'
          itemClassName='capitalize'
          onValueChange={handleAttributeChange}
          disabled={attributeOptions.length === 0}
        />
        <TextInput name='title' value={title} onChange={handleTitleChange} placeholder='Title' />
        <TextAreaInput name='markdown' rows={3} value={markdown} onChange={handleMarkdownChange} placeholder='Text' />
        <MultiSelect
          options={keywordsOptions}
          onValueChange={handleKeywordsChange}
          value={selectedKeywords}
          placeholder='Keywords connected'
          maxCount={3}
        />
      </div>
    </Modal>
  );
}

const strengthOptions = strengthArray.map(({ value }) => ({ label: value.toLowerCase(), value }));
