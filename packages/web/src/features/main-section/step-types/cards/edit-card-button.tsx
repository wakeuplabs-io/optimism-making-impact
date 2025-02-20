import React from 'react';
import { FormModal } from '@/components/form-modal';
import { EditIcon } from '@/components/icons/edit-icon';
import { SelectInput } from '@/components/inputs/select-input';
import { MultiSelect } from '@/components/multi-select/multi-select';
import { TextAreaInput } from '@/components/text-area-input';
import { TextInput } from '@/components/text-input';
import { UpdateCardBody } from '@/services/cards/schemas';
import { Attribute, CompleteCard, Keyword } from '@/types';
import { Trash } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { StrengthEnum } from '@/services/cards/schemas';
import { strengthOptions } from './common';
import { dontAssignOption, useCardFormData } from './useCardFormData';

interface EditCardModalProps {
  stepId: number;
  onSave?: (cardId: number, data: UpdateCardBody) => void;
  onDelete?: (cardId: number) => void;
  keywords: Keyword[];
  attributes?: Attribute[];
  card: CompleteCard;
}

export interface EditCardFormData {
  title: string;
  markdown: string;
  strength: StrengthEnum;
  attributeId: number;
  keywords: string[];
}

export function EditCardModal(props: EditCardModalProps) {
  const defaultValues: EditCardFormData = {
    title: props.card.title,
    markdown: props.card.markdown,
    strength: props.card.strength,
    attributeId: props.card.attributeId || dontAssignOption.value,
    keywords: props.card.keywords.map((k) => k.value),
  };

  const { keywordsOptions, attributeOptions } = useCardFormData({
    keywords: props.keywords,
    attributes: props.attributes,
  });

  function handleSubmit(data: EditCardFormData) {
    const selectedKeywordsValueAndId = data.keywords.map((value) => {
      const keyword = props.keywords.find((keyword) => keyword.value === value);
      return { value, id: keyword?.id };
    });

    props.onSave?.(props.card.id, {
      title: data.title,
      markdown: data.markdown,
      keywords: selectedKeywordsValueAndId,
      strength: data.strength,
      attributeId: data.attributeId < 1 ? undefined : data.attributeId,
      stepId: props.stepId,
    });
  }

  return (
    <FormModal<EditCardFormData>
      title='Edit card'
      trigger={<EditIcon />}
      onSubmit={handleSubmit}
      cancelButtonIcon={<Trash />}
      cancelButtonText='Delete'
      onCancel={() => props.onDelete?.(props.card.id)}
      defaultValues={defaultValues}
      contentProps={{
        onPointerDownOutside: (e) => {
          if (document.getElementById('multiselect-popover-content')) e.preventDefault();
        },
      }}
    >
      <FormFields attributeOptions={attributeOptions} keywordsOptions={keywordsOptions} defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  attributeOptions: { value: string; label: React.ReactNode }[];
  keywordsOptions: { value: string; label: string }[];
  defaultValues: EditCardFormData;
}

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields({ attributeOptions, keywordsOptions, defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<EditCardFormData>();

  return (
    <div className='grid w-full gap-4 py-4'>
      <Controller
        name='strength'
        control={control}
        defaultValue={defaultValues.strength}
        render={({ field }) => (
          <SelectInput
            placeholder='Select Strength'
            name='strength'
            items={strengthOptions}
            triggerClassName='capitalize'
            itemClassName='capitalize'
            onValueChange={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        name='attributeId'
        control={control}
        defaultValue={defaultValues.attributeId}
        render={({ field }) => (
          <SelectInput
            placeholder='Select Smart List Filter'
            name='attribute'
            items={attributeOptions}
            triggerClassName='capitalize'
            itemClassName='capitalize'
            onValueChange={(val) => field.onChange(Number(val))}
            disabled={attributeOptions.length === 0}
            value={String(field.value)}
          />
        )}
      />
      <Controller
        name='title'
        control={control}
        defaultValue={defaultValues.title}
        render={({ field }) => <TextInput {...field} placeholder='Title' />}
      />
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field }) => <TextAreaInput {...field} rows={4} placeholder='Text' />}
      />
      <Controller
        name='keywords'
        control={control}
        defaultValue={defaultValues.keywords}
        render={({ field }) => (
          <MultiSelect
            options={keywordsOptions}
            onValueChange={field.onChange}
            defaultValue={field.value}
            placeholder='Keywords connected'
            maxCount={3}
          />
        )}
      />
    </div>
  );
}
