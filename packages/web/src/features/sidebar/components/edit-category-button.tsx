import { Controller, useFormContext } from 'react-hook-form';
import { FormModal } from '@/components/form-modal';
import { EditIcon } from '@/components/icons/edit-icon';
import { Category } from '@/types';
import { EditCategoryBody, editCategoryBodySchema } from '@optimism-making-impact/schemas';
import { FormTextInput } from '@/components/form/form-text-input';

interface EditCategoryButtonProps {
  onSave: (name: string, icon: string) => void;
  category: Category;
}

export function EditCategoryButton(props: EditCategoryButtonProps) {
  const defaultValues: EditCategoryBody = { name: props.category.name, icon: props.category.icon };

  function handleSubmit(data: EditCategoryBody) {
    props.onSave(data.name, data.icon);
  }

  return (
    <FormModal
      title='Edit category'
      trigger={<EditIcon />}
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={editCategoryBodySchema}
    >
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: EditCategoryBody;
}

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields(props: FormFieldsProps) {
  const { control } = useFormContext<EditCategoryBody>();

  return (
    <div className='grid w-full gap-4 py-4'>
      <Controller
        name='name'
        control={control}
        defaultValue={props.defaultValues.name}
        render={({ field, fieldState }) => <FormTextInput {...field} placeholder='Name' error={fieldState.error?.message} />}
      />
      <Controller
        name='icon'
        control={control}
        defaultValue={props.defaultValues.icon}
        render={({ field, fieldState }) => <FormTextInput {...field} placeholder='Icon' error={fieldState.error?.message} />}
      />
    </div>
  );
}
