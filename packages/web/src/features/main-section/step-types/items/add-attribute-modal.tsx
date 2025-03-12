import { FormModal } from '@/components/form-modal';
import { FormInputWrapper } from '@/components/form/form-input';
import { FormTextInput } from '@/components/form/form-text-input';
import { IconButton } from '@/components/icon-button';
import { ColorSelectInput } from '@/components/inputs/color-select-input';
import { TextAreaInput } from '@/components/text-area-input';
import { Color, CreateAttributeBody, createAttributeSchema } from '@optimism-making-impact/schemas';
import { Plus } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

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
    <div className='grid gap-4 py-4'>
      <Controller
        name='value'
        control={control}
        defaultValue={defaultValues.value}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='description'
        control={control}
        defaultValue={defaultValues.description}
        render={({ field, fieldState }) => (
          <FormInputWrapper error={fieldState.error?.message}>
            <span className='text-xs text-[#BEBEBE] font-normal'>Definition</span>
            <TextAreaInput {...field} rows={5} placeholder='Definition' />
          </FormInputWrapper>
        )}
      />
      <Controller
        name='color'
        control={control}
        defaultValue={defaultValues.color}
        render={({ field, fieldState }) => (
          <FormInputWrapper error={fieldState.error?.message}>
            <span className='text-xs text-[#BEBEBE] font-normal'>Select color</span>
            <ColorSelectInput selected={field.value} onChange={(color: Color) => field.onChange(color)} />
          </FormInputWrapper>
        )}
      />
    </div>
  );
}
