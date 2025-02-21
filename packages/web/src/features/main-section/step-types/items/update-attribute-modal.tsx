import { FormModal } from '@/components/form-modal';
import { FormInputWrapper } from '@/components/form/form-input';
import { FormTextInput } from '@/components/form/form-text-input';
import { ColorSelectInput } from '@/components/inputs/color-select-input';
import { TextAreaInput } from '@/components/text-area-input';
import { Attribute, Color, UpdateAttributeBody, updateAttributeSchema } from '@optimism-making-impact/schemas';
import { Pencil } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

interface UpdateAttributeModalProps {
  attribute: Attribute;
  onClick: (data: UpdateAttributeBody) => void;
}

export function UpdateAttributeModal(props: UpdateAttributeModalProps) {
  const defaultValues: UpdateAttributeBody = {
    id: props.attribute.id,
    value: props.attribute.value,
    description: props.attribute.description,
    color: props.attribute.color,
  };

  function handleSubmit(data: UpdateAttributeBody) {
    props.onClick(data);
  }

  return (
    <FormModal
      title='Edit attribute'
      trigger={
        <button>
          <Pencil size={14} className='stroke-[#8A8A8A] hover:stroke-black' />
        </button>
      }
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateAttributeSchema}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: UpdateAttributeBody;
}

function FormFields({ defaultValues }: FormFieldsProps) {
  const { control } = useFormContext<UpdateAttributeBody>();

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
            <TextAreaInput {...field} rows={5} placeholder='Description' />
          </FormInputWrapper>
        )}
      />
      <Controller
        name='color'
        control={control}
        defaultValue={defaultValues.color}
        render={({ field, fieldState }) => (
          <FormInputWrapper error={fieldState.error?.message}>
            <ColorSelectInput selected={field.value} onChange={(color: Color) => field.onChange(color)} />
          </FormInputWrapper>
        )}
      />
    </div>
  );
}
