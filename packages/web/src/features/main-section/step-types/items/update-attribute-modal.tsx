import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { FormModal } from '@/components/form-modal';
import { FormInputWrapper } from '@/components/form/form-input';
import { FormTextInput } from '@/components/form/form-text-input';
import { ColorSelectInput } from '@/components/inputs/color-select-input';
import { TextAreaInput } from '@/components/text-area-input';
import { Attribute, Color, UpdateAttributeBody, updateAttributeSchema } from '@optimism-making-impact/schemas';
import { Pencil, Save, Trash } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';

interface UpdateAttributeModalProps {
  attribute: Attribute;
  onSave: (data: UpdateAttributeBody) => void;
  onDelete: (attribute: Attribute) => void;
}

export function UpdateAttributeModal(props: UpdateAttributeModalProps) {
  const [isDeleteConfirmationModalOpen, toggleDeleteConfirmationModal] = useToggle();

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
    <>
      <FormModal
        title='Edit filter'
        trigger={
          <button>
            <Pencil size={14} className='stroke-[#8A8A8A] hover:stroke-black' />
          </button>
        }
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={updateAttributeSchema}
        submitButtonIcon={<Save />}
        submitButtonText='Save'
        secondaryButtonText='Delete'
        secondaryButtonIcon={<Trash />}
        onSecondaryClick={toggleDeleteConfirmationModal}
      >
        <FormFields defaultValues={defaultValues} />
      </FormModal>
      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteConfirmationModalOpen}
          title='Delete filter'
          description={
            <span>
              Are you sure you want to remove this Smart List filter?
            </span>
          }
          onConfirm={() => props.onDelete(props.attribute)}
          onOpenChange={toggleDeleteConfirmationModal}
        />
      )}
    </>
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
            <span className='text-xs font-normal text-[#BEBEBE]'>Definition</span>
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
            <span className='text-xs font-normal text-[#BEBEBE]'>Select color</span>
            <ColorSelectInput selected={field.value} onChange={(color: Color) => field.onChange(color)} />
          </FormInputWrapper>
        )}
      />
    </div>
  );
}
