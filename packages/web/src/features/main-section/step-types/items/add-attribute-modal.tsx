import { FormModal } from '@/components/form/form-modal';
import { FormTextInput } from '@/components/form/form-text-input';
import { IconButton } from '@/components/icon-button';
import { Color, CreateAttributeBody, createAttributeSchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormTextArea } from '@/components/form/form-text-area';
import { FormColorSelect } from '@/components/form/form-color-select';

interface AddAttributeModalProps {
  smartListFilterId: number;
  onClick: (data: CreateAttributeBody) => void;
}

export function AddAttributeModal(props: AddAttributeModalProps) {
  const defaultValues: CreateAttributeBody = {
    value: '',
    description: '',
    color: 'RED',
    smartListFilterId: props.smartListFilterId,
  };

  function handleSubmit(data: CreateAttributeBody) {
    props.onClick(data);
  }

  return (
    <FormModal
      title='New filter'
      trigger={<IconButton icon={<Plus />} variant='secondary' className='h-[35px] w-[35px]' />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={createAttributeSchema}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: CreateAttributeBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<CreateAttributeBody>();

  return (
    <div className='grid gap-3'>
      <Controller
        name='value'
        control={control}
        defaultValue={defaultValues.value}
        render={({ field, fieldState }) => <FormTextInput label='Title' {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='description'
        control={control}
        defaultValue={defaultValues.description}
        render={({ field, fieldState }) => (
          <FormTextArea error={fieldState.error?.message} label='Definition' rows={5} placeholder='Definition' {...field} />
        )}
      />
      <Controller
        name='color'
        control={control}
        defaultValue={defaultValues.color}
        render={({ field, fieldState }) => (
          <FormColorSelect
            label='Select color'
            error={fieldState.error?.message}
            selected={field.value}
            onChange={(color: Color) => field.onChange(color)}
            containerClassName='w-full'
          />
        )}
      />
    </div>
  );
}
