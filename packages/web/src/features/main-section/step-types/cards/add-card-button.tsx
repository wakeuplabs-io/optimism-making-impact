import { FormSelect } from '@/components/form/form-select';
import { AttributeOption, strengthOptions } from '../utils';
import { nonAssignedOption, useCardFormData } from './useCardFormData';
import { ActionButton } from '@/components/action-button';
import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { Attribute, CreateCardBody, createCardBodySchema, Keyword } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormMultiSelect } from '@/components/form/form-multi-select';

interface AddCardModalProps {
  stepId: number;
  onClick?: (data: CreateCardBody) => void;
  keywords: Keyword[];
  attributes?: Attribute[];
}

export function AddCardModal(props: AddCardModalProps) {
  const defaultValues: CreateCardBody = {
    title: '',
    markdown: '',
    strength: 'MEDIUM',
    keywords: [],
    stepId: props.stepId,
  };

  const { attributeOptions } = useCardFormData({
    attributes: props.attributes,
  });

  function handleSubmit({ title, markdown, keywords, strength, attributeId, stepId }: CreateCardBody) {
    const numericAttributeId = attributeId ? +attributeId : 0;

    props.onClick?.({
      title,
      markdown,
      stepId,
      strength,
      keywords,
      attributeId: numericAttributeId === nonAssignedOption.value ? undefined : numericAttributeId,
    });
  }

  return (
    <FormModal
      title='New card'
      trigger={<ActionButton label='Add card' variant='secondary' icon={<Plus />} className='w-[320px] max-w-[320px] lg:w-[250px]' />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createCardBodySchema}
    >
      <FormFields keywords={props.keywords} attributeOptions={attributeOptions} />
    </FormModal>
  );
}

interface FormFieldsProps {
  keywords: Keyword[];
  attributeOptions: AttributeOption[];
}

function FormFields(props: FormFieldsProps) {
  const { control } = useFormContext<CreateCardBody>();

  return (
    <div className='flex flex-col gap-2'>
      <Controller
        name='strength'
        control={control}
        render={({ field, fieldState, formState }) => (
          <FormSelect
            error={fieldState.error?.message}
            name={field.name}
            items={strengthOptions}
            onValueChange={field.onChange}
            defaultValue={formState.defaultValues?.strength}
            itemClassName='capitalize'
            triggerClassName='capitalize'
          />
        )}
      />
      <Controller
        name='attributeId'
        control={control}
        render={({ field, fieldState }) => (
          <FormSelect
            error={fieldState.error?.message}
            name={field.name}
            label={'Smart List Filter'}
            placeholder='Select Smart List Filter'
            items={props.attributeOptions}
            onValueChange={(value) => field.onChange(+value)}
            disabled={props.attributeOptions.length === 0}
            triggerClassName='capitalize'
            itemClassName='capitalize'
          />
        )}
      />
      <Controller
        name='title'
        control={control}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='markdown'
        control={control}
        render={({ field, fieldState }) => <FormTextInput label='Text' {...field} error={fieldState.error?.message} placeholder='Text' />}
      />
      <Controller
        name='keywords'
        control={control}
        render={({ field }) => (
          <FormMultiSelect
            label='Keywords connected'
            value={field.value}
            options={props.keywords}
            onChange={(value) => {
              field.onChange(value);
            }}
            name={field.name}
          />
        )}
      />
    </div>
  );
}
