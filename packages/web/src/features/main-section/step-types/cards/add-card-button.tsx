import { AttributeOption, strengthOptions } from '../utils';
import { nonAssignedOption, useCardFormData } from './useCardFormData';
import { ActionButton } from '@/components/action-button';
import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { SelectInput } from '@/components/inputs/select-input';
import { MultiSelectInput } from '@/components/ui/multi-select';
import { Attribute, CreateCardBody, createCardBodySchema, Keyword } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

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
      <FormFields defaultValues={defaultValues} keywords={props.keywords} attributeOptions={attributeOptions} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: CreateCardBody;
  keywords: Keyword[];
  attributeOptions: AttributeOption[];
}

function FormFields(props: FormFieldsProps) {
  const { control } = useFormContext<CreateCardBody>();

  return (
    <div className='flex w-[320px] max-w-full flex-col gap-4 py-4'>
      <Controller
        name='title'
        control={control}
        defaultValue={props.defaultValues.title}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='markdown'
        control={control}
        defaultValue={props.defaultValues.markdown}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Markdown' />}
      />
      <Controller
        name='strength'
        control={control}
        defaultValue={props.defaultValues.strength}
        render={({ field, formState }) => (
          <SelectInput
            name='type'
            items={strengthOptions}
            onValueChange={field.onChange}
            defaultValue={formState.defaultValues?.strength}
            placeholder='Select Strength'
            triggerClassName='capitalize'
            itemClassName='capitalize'
          />
        )}
      />
      <Controller
        name='attributeId'
        control={control}
        defaultValue={props.defaultValues.attributeId}
        render={({ field }) => (
          <SelectInput
            placeholder='Select Smart List Filter'
            name='attribute'
            items={props.attributeOptions}
            triggerClassName='capitalize'
            itemClassName='capitalize'
            onValueChange={(value) => field.onChange(+value)}
            disabled={props.attributeOptions.length === 0}
          />
        )}
      />
      <Controller
        name='keywords'
        control={control}
        defaultValue={props.defaultValues.keywords}
        render={({ field }) => (
          <MultiSelectInput
            value={field.value}
            options={props.keywords}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
    </div>
  );
}
