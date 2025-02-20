import { ColorDot } from '@/components/color-dot';
import { FormModal } from '@/components/form-modal-old';
import { IconButton } from '@/components/icon-button';
import { SelectInput } from '@/components/inputs/select-input';
import { TextAreaInput } from '@/components/text-area-input';
import { CreateItemBody } from '@/services/items/schemas';
import { Attribute } from '@/types';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface AddItemModalProps {
  attributes: Attribute[];
  stepId: number;
  onClick: (data: CreateItemBody) => void;
}

interface AddItemFormData {
  markdown: string;
  attributeId?: number;
}

export function AddItemModal(props: AddItemModalProps) {
  const attributeOptions = useMemo(
    () =>
      props.attributes.map((a) => ({
        value: a.id.toString(),
        label: (
          <div className='flex items-center gap-2'>
            <ColorDot color={a.color} />
            <span>{a.value}</span>
          </div>
        ),
      })),
    [props.attributes],
  );

  const defaultValues: AddItemFormData = {
    markdown: '',
    attributeId: undefined,
  };

  function handleSubmit(data: AddItemFormData) {
    if (!data.attributeId) return;
    props.onClick({ markdown: data.markdown, attributeId: data.attributeId, stepId: props.stepId });
  }

  return (
    <FormModal<AddItemFormData>
      title='Add item'
      trigger={<IconButton icon={<Plus />} variant='secondary' className='h-[35px] w-[35px]' />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    >
      <FormFields attributeOptions={attributeOptions} defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  attributeOptions: { value: string; label: React.ReactNode }[];
  defaultValues: AddItemFormData;
}

function FormFields({ attributeOptions, defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<AddItemFormData>();

  return (
    <div className='grid gap-4 py-4'>
      <Controller
        name='markdown'
        control={control}
        defaultValue={defaultValues.markdown}
        render={({ field }) => <TextAreaInput {...field} rows={5} placeholder='Content' />}
      />
      {attributeOptions.length > 0 && (
        <Controller
          name='attributeId'
          control={control}
          defaultValue={defaultValues.attributeId}
          render={({ field }) => (
            <SelectInput
              name='attributeId'
              items={attributeOptions}
              onValueChange={(val) => field.onChange(Number(val))}
              value={String(field.value ?? '')}
              placeholder='Select an attribute'
            />
          )}
        />
      )}
    </div>
  );
}
