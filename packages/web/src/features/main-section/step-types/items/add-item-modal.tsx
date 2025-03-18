import { FormModal } from '@/components/form/form-modal';
import { CreateItemBody, createItemSchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { IconButton } from '@/components/icon-button';
import { AttributeOption, attributesOptionsMapper } from '../utils';
import { FormTextArea } from '@/components/form/form-text-area';
import { FormSelect } from '@/components/form/form-select';
import { useItemsContext } from './items-context';

interface AddItemModalProps {
  onClick: (data: CreateItemBody) => void;
}

export function AddItemModal(props: AddItemModalProps) {
  const { step, attributes } = useItemsContext();
  const attributeOptions = useMemo(() => attributesOptionsMapper(attributes), [attributes]);

  const defaultValues: CreateItemBody = {
    markdown: '',
    attributeId: 0,
    stepId: step.id,
  };

  function handleSubmit(data: CreateItemBody) {
    if (!data.attributeId) return;
    props.onClick({
      markdown: data.markdown,
      attributeId: +data.attributeId,
      stepId: data.stepId,
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
    <div className='grid gap-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field, fieldState }) => (
          <FormTextArea label='Content' error={fieldState.error?.message} {...field} rows={5} placeholder='Content' />
        )}
      />
      {attributeOptions.length > 0 && (
        <Controller
          name='attributeId'
          control={control}
          defaultValue={defaultValues.attributeId}
          render={({ field, fieldState }) => (
            <FormSelect
              error={fieldState.error?.message}
              name='attributeId'
              label='Attribute'
              items={attributeOptions}
              onValueChange={(value) => field.onChange(+value)}
              placeholder='Select an attribute'
            />
          )}
        />
      )}
    </div>
  );
}
