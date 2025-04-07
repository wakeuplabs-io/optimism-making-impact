import { EditEntityModal } from '@/components/form/edit-entity-modal';
import { FormColorSelect } from '@/components/form/form-color-select';
import { FormTextArea } from '@/components/form/form-text-area';
import { FormTextInput } from '@/components/form/form-text-input';
import { Attribute, Color, UpdateAttributeBody, updateAttributeSchema } from '@optimism-making-impact/schemas';
import { Controller, useFormContext } from 'react-hook-form';

interface UpdateAttributeModalProps {
  attribute: Attribute;
  onSave: (data: UpdateAttributeBody) => void;
  onDelete: (attribute: Attribute) => void;
}

export function UpdateAttributeModal(props: UpdateAttributeModalProps) {
  const defaultValues: UpdateAttributeBody = {
    id: props.attribute.id,
    value: props.attribute.value,
    description: props.attribute.description,
    color: props.attribute.color,
  };

  function handleSubmit(data: UpdateAttributeBody) {
    props.onSave(data);
  }

  return (
    <EditEntityModal
      entity='filter'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={updateAttributeSchema}
      deleteDescription={
        <span>
          Are you sure you want to remove <b>{props.attribute.value}</b> filter?
        </span>
      }
      onDelete={() => props.onDelete(props.attribute)}
    >
      <FormFields />
    </EditEntityModal>
  );
}

function FormFields() {
  const { control } = useFormContext<UpdateAttributeBody>();

  return (
    <div className='grid gap-3'>
      <Controller
        name='value'
        control={control}
        render={({ field, fieldState }) => <FormTextInput {...field} error={fieldState.error?.message} placeholder='Title' />}
      />
      <Controller
        name='description'
        control={control}
        render={({ field, fieldState }) => (
          <FormTextArea error={fieldState.error?.message} label='Definition' rows={5} placeholder='Definition' {...field} />
        )}
      />
      <Controller
        name='color'
        control={control}
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
