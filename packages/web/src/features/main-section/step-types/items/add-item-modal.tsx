import { FormModal } from '@/components/form/form-modal';
import { SelectInput } from '@/components/inputs/select-input';
import { Attribute, CreateItemBody, createItemSchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { IconButton } from '@/components/icon-button';
import { AttributeOption, attributesOptionsMapper } from '../utils';
import { FormInputWrapper } from '@/components/form/form-input';
import { TextAreaInput } from '@/components/text-area-input';

interface AddItemModalProps {
  attributes: Attribute[];
  stepId: number;
  onClick: (data: CreateItemBody) => void;
}

export function AddItemModal(props: AddItemModalProps) {
  const attributeOptions = useMemo(() => attributesOptionsMapper(props.attributes), [props.attributes]);

  const defaultValues: CreateItemBody = {
    markdown: '',
    attributeId: 0,
    stepId: props.stepId,
  };

  function handleSubmit(data: CreateItemBody) {
    if (!data.attributeId) return;
    props.onClick({
      markdown: data.markdown,
      attributeId: +data.attributeId,
      stepId: props.stepId,
    });
  }

  return (
    <FormModal
      title='Add item'
      trigger={<IconButton icon={<Plus />} variant='secondary' className='h-[35px] w-[35px]' />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createItemSchema}
    >
      <FormFields defaultValues={defaultValues} attributeOptions={attributeOptions} />
    </FormModal>
  );
}

interface FormFieldsProps {
  attributeOptions: AttributeOption[];
  defaultValues: CreateItemBody;
}

function FormFields({ attributeOptions, defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<CreateItemBody>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field, fieldState }) => (
          <FormInputWrapper error={fieldState.error?.message}>
            <TextAreaInput {...field} rows={5} placeholder='Content' />
          </FormInputWrapper>
        )}
      />
      {attributeOptions.length > 0 && (
        <Controller
          name='attributeId'
          control={control}
          defaultValue={defaultValues.attributeId}
          render={({ field, fieldState }) => (
            <FormInputWrapper error={fieldState.error?.message}>
              <SelectInput
                name='attributeId'
                items={attributeOptions}
                onValueChange={(value) => field.onChange(+value)}
                placeholder='Select an attribute'
              />
            </FormInputWrapper>
          )}
        />
      )}
    </div>
  );
}
