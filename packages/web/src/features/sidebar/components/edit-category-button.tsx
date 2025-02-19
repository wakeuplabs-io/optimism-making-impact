import { FormModal } from '@/components/form-modal';
import { EditIcon } from '@/components/icons/edit-icon';
import { TextInput } from '@/components/text-input';
import { Category } from '@/types';
import { Controller, useFormContext } from 'react-hook-form';

interface EditCategoryButtonProps {
  onSave: (name: string, icon: string) => void;
  category: Category;
}

interface EditCategoryFormData {
  name: string;
  iconUrl: string;
}

export function EditCategoryButton(props: EditCategoryButtonProps) {
  const defaultValues: EditCategoryFormData = { name: props.category.name, iconUrl: props.category.icon };

  function handleSubmit(data: EditCategoryFormData) {
    props.onSave(data.name, data.iconUrl);
  }

  return (
    <FormModal<EditCategoryFormData> title='Edit Category' trigger={<EditIcon />} onSubmit={handleSubmit} defaultValues={defaultValues}>
      <FormFields defaultValues={defaultValues} />
    </FormModal>
  );
}

interface FormFieldsProps {
  defaultValues: EditCategoryFormData;
}

// The inner form fields use react-hook-form's context.
// We use Controller for inputs that work as controlled components.
function FormFields(props: FormFieldsProps) {
  const { control } = useFormContext<EditCategoryFormData>();

  return (
    <div className='grid w-full gap-4 py-4'>
      <Controller
        name='name'
        control={control}
        defaultValue={props.defaultValues.name}
        render={({ field }) => <TextInput {...field} placeholder='Title' />}
      />
      <Controller
        name='iconUrl'
        control={control}
        defaultValue={props.defaultValues.iconUrl}
        render={({ field }) => <TextInput {...field} placeholder='Icon URL' />}
      />
    </div>
  );
}
